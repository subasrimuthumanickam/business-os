import  db  from "../config/db.js"; // adjust path to match your db wrapper location

export interface CustomerComment {
  id: number;
  customer_id: number;
  type: "manual" | "activity";
  comment_text: string;
  created_by: number | null;
  created_by_name?: string;
  created_at: string;
  updated_at: string | null;
}

// Get all comments (manual + activity) for a customer, newest first
export const getCommentsByCustomer = async (
  customerId: number
): Promise<CustomerComment[]> => {
  const rows = await db.execute(
    `SELECT
       cc.id, cc.customer_id, cc.type, cc.comment_text,
       cc.created_by, cc.created_at, cc.updated_at,
       u.display_name AS created_by_name
     FROM customer_comments cc
     LEFT JOIN users u ON u.id = cc.created_by
     WHERE cc.customer_id = ?
     ORDER BY cc.created_at DESC`,
    [customerId]
  );
  return rows as CustomerComment[];
};

// Add a manual comment (typed by a user)
export const addComment = async (
  customerId: number,
  commentText: string,
  userId: number
): Promise<CustomerComment> => {
  const result: any = await db.execute(
    `INSERT INTO customer_comments (customer_id, type, comment_text, created_by)
     VALUES (?, 'manual', ?, ?)`,
    [customerId, commentText, userId]
  );

  const insertId = result.insertId;

  const rows = await db.execute(
    `SELECT
       cc.id, cc.customer_id, cc.type, cc.comment_text,
       cc.created_by, cc.created_at, cc.updated_at,
       u.display_name AS created_by_name
     FROM customer_comments cc
     LEFT JOIN users u ON u.id = cc.created_by
     WHERE cc.id = ?`,
    [insertId]
  );

  const list = rows as CustomerComment[];
  const created = list[0];
  if (!created) {
    throw new Error("Failed to fetch comment after insert");
  }
  return created;
};

// Edit a manual comment — only the creator can edit (checked in controller)
export const updateComment = async (
  commentId: number,
  commentText: string
): Promise<void> => {
  await db.execute(
    `UPDATE customer_comments
     SET comment_text = ?, updated_at = NOW()
     WHERE id = ? AND type = 'manual'`,
    [commentText, commentId]
  );
};

// Delete a manual comment — only the creator can delete (checked in controller)
export const deleteComment = async (commentId: number): Promise<void> => {
  await db.execute(
    `DELETE FROM customer_comments WHERE id = ? AND type = 'manual'`,
    [commentId]
  );
};

// Fetch a single comment (used by controller to verify ownership before edit/delete)
export const getCommentById = async (
  commentId: number
): Promise<CustomerComment | null> => {
  const rows = await db.execute(
    `SELECT id, customer_id, type, comment_text, created_by, created_at, updated_at
     FROM customer_comments WHERE id = ?`,
    [commentId]
  );
  const list = rows as CustomerComment[];
  return list.length ? list[0]! : null;
};

// -----------------------------------------------------------------------
// Activity logger — call this from invoice.service.ts, payment.service.ts,
// estimate.service.ts etc. whenever a relevant event happens.
// Example: await logActivity(customerId, `Invoice ${invNumber} created`);
// -----------------------------------------------------------------------
export const logActivity = async (
  customerId: number,
  activityText: string
): Promise<void> => {
  await db.execute(
    `INSERT INTO customer_comments (customer_id, type, comment_text, created_by)
     VALUES (?, 'activity', ?, NULL)`,
    [customerId, activityText]
  );
};