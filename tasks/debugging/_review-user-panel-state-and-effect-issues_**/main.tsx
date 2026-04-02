"use client";
import { useEffect, useState } from "react";

type User = {
  id: string;
  name?: string;
  email: string;
  role: string;
  active: boolean;
};

type Props = {
  users: User[];
  selectedUserId?: string;
};

const initialUsers: User[] = [
  {
    id: "u1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Designer",
    active: true,
  },
  {
    id: "u2",
    name: "Brian Lee",
    email: "brian@example.com",
    role: "Frontend Engineer",
    active: false,
  },
  {
    id: "u3",
    email: "carla@example.com",
    role: "Product Manager",
    active: true,
  },
];

export default function App() {
  // Why the 'selectedUserId' id explicit here? Can't it be derived from 'initialUsers'?
  return <UserPanel users={initialUsers} selectedUserId="us2" />;
}

function UserPanel({ users, selectedUserId }: Props) {
  const [localUsers, setLocalUsers] = useState(users);
  const [selectedUser, setSelectedUser] = useState<User | null>(
    users.find((user) => user.id === selectedUserId) ?? users[0] ?? null,
  );
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(localUsers);
  const [headerText, setHeaderText] = useState(
    selectedUser ? `${selectedUser.name} (${selectedUser.role})` : "No user",
  );

  useEffect(() => {
    setFilteredUsers(
      localUsers.filter((user) =>
        user.name?.toLowerCase().includes(search.toLowerCase()),
      ),
    );
    //Wrong dependency, instead of 'search' it should be 'localUsers'
  }, [search]);

  useEffect(() => {
    if (selectedUser) {
      setHeaderText(`${selectedUser.name} (${selectedUser.role})`);
    }
    //Wronf dependency, instead of 'selectedUserId, should be 'selectedUser', that's why we don't see the header changes after clicking other user name.
  }, [selectedUserId]);

  const toggleActive = () => {
    if (!selectedUser) {
      return;
    }

    setSelectedUser({
      ...selectedUser,
      active: !selectedUser.active,
    });

    setLocalUsers(
      localUsers.map((user) =>
        user.id === selectedUser.id ? { ...user, active: !user.active } : user,
      ),
    );
  };

  return (
    <main>
      <h1>User panel</h1>
      <h2>{headerText}</h2>

      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search users"
      />

      <div style={layoutStyle}>
        <aside>
          <ul>
            {filteredUsers.map((user) => (
              <li key={user.id}>
                <button onClick={() => setSelectedUser(user)}>
                  {user.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <section>
          {selectedUser ? (
            <div>
              <div>Email: {selectedUser.email}</div>
              <div>Role: {selectedUser.role}</div>
              <div>Status: {selectedUser.active ? "Active" : "Inactive"}</div>
              <button onClick={toggleActive}>Toggle active</button>
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
