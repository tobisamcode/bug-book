"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import UserAvatar from "@/components/user-avatar";
import { useSession } from "@/app/(main)/session-provider";

import "./styles.css";
import { useSubmitPostMuation } from "@/features/posts/services/mutations";
import LoadingButton from "@/components/loading-button";

export default function PostEditor() {
  const { user } = useSession();

  const { mutate, isPending } = useSubmitPostMuation();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "What's on your mind?",
      }),
    ],
  });

  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) ?? "";

  function onSubmit() {
    mutate(input, {
      onSuccess: () => {
        editor?.commands.clearContent();
      },
    });
    editor?.commands.clearContent();
  }

  return (
    <div className="bg-card flex flex-col gap-5 rounded-2xl p-5 shadow-sm">
      <div className="flex gap-5">
        <UserAvatar avatarUrl={user.avatarUrl} className="hidden sm:inline" />
        <EditorContent
          editor={editor}
          className="bg-background max-h-[20rem] w-full overflow-y-auto rounded-2xl px-5 py-3"
        />
      </div>

      <div className="flex justify-end">
        <LoadingButton
          loading={isPending}
          onClick={onSubmit}
          disabled={!input.trim()}
          className="min-w-20"
        >
          Post
        </LoadingButton>
      </div>
    </div>
  );
}
