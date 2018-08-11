import Link from "next/link";

export default (props)) => (
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
