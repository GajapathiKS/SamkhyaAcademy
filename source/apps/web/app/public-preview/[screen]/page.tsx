import { notFound } from "next/navigation";
import { PublicShowcaseScreen } from "@/components/experience/PublicShowcaseScreen";

const supported = new Set([2,3,4,5,6,11,12,13,14,15,16,17]);

export default async function PublicPreviewPage({params}:{params:Promise<{screen:string}>}){
 const screen=Number((await params).screen);
 if(!supported.has(screen))notFound();
 return <PublicShowcaseScreen screen={screen}/>;
}
