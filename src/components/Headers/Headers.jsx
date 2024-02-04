import { useSelector } from "react-redux";
import { LogoutBtn, Container, Logo } from "../index.js";
import { Link, useNavigate } from "react-router-dom";

function Headers() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "home", slug: "/", active: true },
    { name: "login", slug: "/login", active: !authStatus },
    { name: "Sighup", slug: "/signup", active: !authStatus },
    { name: "All Post", slug: "all-posts", active: authStatus },
    { name: "Add Post", slug: "add-post", active: authStatus },
  ];
  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link width="70px">
              <Logo />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Headers;
