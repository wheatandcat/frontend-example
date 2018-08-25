import Link from "next/link";

export default props => (
  <div>
    <h3>nextjs | 004-router</h3>
    <Link href="/">
      <a>users</a>
    </Link>{" "}
    |{" "}
    <Link href="/createUser">
      <a>createUser</a>
    </Link>{" "}
  </div>
);
