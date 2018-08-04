import Link from "next/link";

export default () => (
  <div>
    <Link href="/">
      <a>users</a>
    </Link>{" "}
    |{" "}
    <Link href="/createUser">
      <a>createUser</a>
    </Link>{" "}
  </div>
);
