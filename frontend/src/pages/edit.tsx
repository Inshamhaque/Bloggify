import { createOpenAI } from "@ai-sdk/openai";
import { BlockNoteEditor, filterSuggestionItems } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { en } from "@blocknote/core/locales";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import {
  FormattingToolbar,
  FormattingToolbarController,
  SuggestionMenuController,
  getDefaultReactSlashMenuItems,
  getFormattingToolbarItems,
  useCreateBlockNote,
} from "@blocknote/react";
import {
  AIMenuController,
  AIToolbarButton,
  createAIExtension,
  createBlockNoteAIClient,
  getAISlashMenuItems,
} from "@blocknote/xl-ai";
import { en as aiEn } from "@blocknote/xl-ai/locales";
import "@blocknote/xl-ai/style.css";
import GitHubNavbar from "../components/Navbar";

export const BLOCKNOTE_AI_SERVER_API_KEY = "BLOCKNOTE_SECRET";
export const BLOCKNOTE_AI_SERVER_BASE_URL = "http://localhost:3001/ai";

// Using proxy requests through your custom Express server
const client = createBlockNoteAIClient({
  apiKey: BLOCKNOTE_AI_SERVER_API_KEY,
  baseURL: BLOCKNOTE_AI_SERVER_BASE_URL,
});

// Use OpenAI model via proxy client
const model = createOpenAI({
  ...client.getProviderSettings("openai"),
})("gpt-4o-mini", {});

// Main Editor Component
export default function Editlog() {
  const editor = useCreateBlockNote({
    dictionary: {
      ...en,
      ai: aiEn,
    },
    extensions: [
      createAIExtension({
        model,
      }),
    ],
    initialContent: [
      {
        type: "heading",
        props: {
          level: 1,
        },
        content: "✨ Start Editing Your Blog",
      },
      {
        type: "paragraph",
        content:
          "Begin writing your blog post here. You can use AI features by typing '/' to open the slash menu or selecting text and clicking the AI button in the toolbar.",
      },
    ],
  });

  const handleSave = () => {
    const json = editor.document;
    console.log("Blog content JSON:", json);
  };

  return (
    <div className="h-screen flex flex-col bg-[#1e1e1e] text-white">
      {/* Navbar */}
      <GitHubNavbar />

      {/* Page Heading */}
      <h1 className="text-3xl font-bold mb-4 text-white px-4 pt-4">
        📝 Edit existing Blog
      </h1>

      {/* Editor Container */}
      <div className="flex-1 max-h-[70vh] overflow-auto rounded-lg border border-gray-700 mx-4">
        <BlockNoteView
          editor={editor}
          className="min-h-[400px] px-4 py-2 overflow-auto"
          theme="dark"
          formattingToolbar={false}
          slashMenu={false}
        >
          {/* AI Commands */}
          <AIMenuController />

          {/* Formatting Toolbar with AI */}
          <FormattingToolbarWithAI />

          {/* Slash Menu with AI */}
          <SuggestionMenuWithAI editor={editor} />
        </BlockNoteView>
      </div>

      {/* Save Button */}
      <div className="mt-4 flex justify-end px-4 py-2">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Save Blog
        </button>
      </div>
    </div>
  );
}

// Formatting toolbar with the `AIToolbarButton` added
function FormattingToolbarWithAI() {
  return (
    <FormattingToolbarController
      formattingToolbar={() => (
        <FormattingToolbar>
          {...getFormattingToolbarItems()}
          <AIToolbarButton />
        </FormattingToolbar>
      )}
    />
  );
}

// Slash menu with the AI option added
function SuggestionMenuWithAI(props: {
  editor: BlockNoteEditor<any, any, any>;
}) {
  return (
    <SuggestionMenuController
      triggerCharacter="/"
      getItems={async (query) =>
        filterSuggestionItems(
          [
            ...getDefaultReactSlashMenuItems(props.editor),
            ...getAISlashMenuItems(props.editor),
          ],
          query
        )
      }
    />
  );
}
