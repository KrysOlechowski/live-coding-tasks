import { useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

const initialUsers: User[] = [
  {
    id: "u1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Designer",
  },
  {
    id: "u2",
    name: "Brian Lee",
    email: "brian@example.com",
    role: "Frontend Engineer",
  },
  {
    id: "u3",
    name: "Carla Gomez",
    email: "carla@example.com",
    role: "Product Manager",
  },
];

const refreshedUsers: User[] = [
  {
    id: "u1",
    name: "Alice Cooper",
    email: "alice@example.com",
    role: "Lead Designer",
  },
  {
    id: "u2",
    name: "Brian Lee",
    email: "brian.lee@example.com",
    role: "Senior Frontend Engineer",
  },
];

export default function App() {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(initialUsers[0]);

  const refreshUsers = () => {
    setUsers(refreshedUsers);
  };

  return (
    <main>
      <h1>Users</h1>
      <button onClick={refreshUsers}>Refresh user list</button>

      <div style={layoutStyle}>
        <aside>
          <h2>User list</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <button onClick={() => setSelectedUser(user)}>{user.name}</button>
              </li>
            ))}
          </ul>
        </aside>

        <section>
          <h2>Details</h2>

          {/* TODO: fix the stale selected user bug after the list refreshes */}
          {/* TODO: keep the selected user behavior without forcing a full reload */}
          {/* TODO: handle cases where the selected user changes in the refreshed list */}
          {/* TODO: handle cases where the selected user is removed or the list becomes empty */}

          {selectedUser ? (
            <div>
              <div>Name: {selectedUser.name}</div>
              <div>Email: {selectedUser.email}</div>
              <div>Role: {selectedUser.role}</div>
            </div>
          ) : (
            <div>No user selected.</div>
          )}
        </section>
      </div>
    </main>
  );
}

const layoutStyle = {
  display: "grid",
  gap: "24px",
  gridTemplateColumns: "1fr 1fr",
  marginTop: "16px",
};
