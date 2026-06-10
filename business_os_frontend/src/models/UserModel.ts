 // models/UserModel.ts
export interface User {
  name: string;
  role: string;
  avatar: string;
}

class UserModel {
  private user: User;

  constructor() {
    this.user = {
      name: 'Super Admin',
      role: 'Admin',
      avatar: 'SA'
    };
  }

  getUser(): User {
    return { ...this.user };
  }

  updateUser(userData: Partial<User>): void {
    this.user = { ...this.user, ...userData };
  }
}

export default UserModel;
