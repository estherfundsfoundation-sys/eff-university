import { requireChatGPTUser, chatGPTSignOutPath } from "../chatgpt-auth";
import CommunityHub from "./CommunityHub";

export const dynamic = "force-dynamic";

export default async function CommunityPage() {
  const user = await requireChatGPTUser("/community");
  return <CommunityHub accountName={user.displayName} signOutPath={chatGPTSignOutPath("/")} />;
}
