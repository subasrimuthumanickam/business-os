import db from "../config/db.js";

export const getUserProfile = async (userId: number) => {
  const query = `
    SELECT id, name, display_name, email, phone, avatar_url
    FROM users
    WHERE id = ?
  `;
  const rows: any = await db.execute(query, [userId]);
  const data = Array.isArray(rows[0]) ? rows[0] : rows;
  const user = data[0];

  if (!user) return null;

  return {
    fullName: user.name,
    displayName: user.display_name || "",
    email: user.email,
    phone: user.phone || "",
    avatar: user.avatar_url,
    avatarPreview: user.avatar_url,
  };
};

interface UpdateProfileInput {
  fullName: string;
  displayName: string;
  email: string;
  phone: string;
  avatarUrl?: string; // only present if a new avatar was uploaded
}

export const updateUserProfile = async (userId: number, input: UpdateProfileInput) => {
  if (input.avatarUrl) {
    await db.execute(
      `UPDATE users SET name = ?, display_name = ?, email = ?, phone = ?, avatar_url = ? WHERE id = ?`,
      [input.fullName, input.displayName, input.email, input.phone, input.avatarUrl, userId]
    );
  } else {
    await db.execute(
      `UPDATE users SET name = ?, display_name = ?, email = ?, phone = ? WHERE id = ?`,
      [input.fullName, input.displayName, input.email, input.phone, userId]
    );
  }

  return getUserProfile(userId);
};