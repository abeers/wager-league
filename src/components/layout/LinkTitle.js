import { Link } from "react-router";

export default function LinkTitle({ title, link }) {
  return <Link className='link-title' to={link}>{title}</Link>
}
