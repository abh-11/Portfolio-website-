import Link from "next/link";
import Specimen from "@/components/Specimen";
export default function NotFound() {
  return <main id="main" className="missing wrap"><Specimen subject="sprig"/>
    <p className="overline">404 / PAGE MISSING</p><h1>Off the <em>path.</em></h1>
    <p>This page may have moved. The journal starts here.</p><Link href="/" className="button primary">Return to the journal <span aria-hidden="true">↗</span></Link></main>;
}
