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
export const BLOCKNOTE_AI_SERVER_API_KEY="BLOCKNOTE_SECRET"
export const BLOCKNOTE_AI_SERVER_BASE_URL="http://localhost:3001/ai"

// Using proxy requests through your custom Express server
const client = createBlockNoteAIClient({
  apiKey: BLOCKNOTE_AI_SERVER_API_KEY,
  baseURL: "http://localhost:3001/ai",
});

// Use OpenAI model via proxy client
const model = createOpenAI({
  // call via our proxy client
  ...client.getProviderSettings("openai"),
})("gpt-4o-mini", {});

// fetch the current contents of the blog and pass in the state
export default function Editlog() {
  // Creates a new editor instance with AI extension
  const editor = useCreateBlockNote({
    dictionary: {
      ...en,
      ai: aiEn, // add default translations for the AI extension
    },
    // Register the AI extension
    extensions: [
      createAIExtension({
        model,
      }),
    ],
    // Initial content for demo purposes
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
    <div className="h-screen flex flex-col bg-[#1e1e1e] text-white ">
        <GitHubNavbar />
      {/* Header */}
      <h1 className="text-3xl font-bold mb-4 text-white">📝 Create New Blog</h1>

      {/* Editor */}
      <div className="flex-1 overflow-hidden rounded-lg border border-gray-700">
        <BlockNoteView
          editor={editor}
          className="h-full"
          theme="dark"
          // We're disabling some default UI elements to customize them
          formattingToolbar={false}
          slashMenu={false}
        >
          {/* Add the AI Command menu to the editor */}
          <AIMenuController />

          {/* We disabled the default formatting toolbar with `formattingToolbar=false` 
          and replace it for one with an "AI button" (defined below). 
          (See "Formatting Toolbar" in docs)
          */}
          <FormattingToolbarWithAI />

          {/* We disabled the default SlashMenu with `slashMenu=false` 
          and replace it for one with an AI option (defined below). 
          (See "Suggestion Menus" in docs)
          */}
          <SuggestionMenuWithAI editor={editor} />
        </BlockNoteView>
      </div>

      {/* Save Button */}
      <div className="mt-4 flex justify-end">
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
          {/* Add the AI button */}
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
            // add the default AI slash menu items, or define your own
            ...getAISlashMenuItems(props.editor),
          ],
          query,
        )
      }
    />
  );
}