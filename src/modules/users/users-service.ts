export class UserService {
  private readonly users = [
    { id: 1, firstName: "John", lastName: "Doe" },
    { id: 2, firstName: "Jane" },
  ];

  async findById(id: string) {
    const parsedId = parseInt(id, 10);
    return this.users.find((user) => user.id === parsedId);
  }

  async findAll({ skip, take }: { skip: number; take: number }) {
    return this.users.slice(skip, skip + take);
  }

  async addNew(data: NewUserInput) {
    const newUser = { id: this.users.length + 1, ...data };
    this.users.push(newUser);
    return {
      ...newUser,
      id: newUser.id.toString(),
    };
  }
}
