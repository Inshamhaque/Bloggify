import { useEffect, useState } from "react";
import GitHubNavbar from "../components/Navbar";
import axios from "axios";
import { BACKEND_URL } from "../config";

export default function Preview() {
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get content from localStorage
    try {
      const storedContent = localStorage.getItem("blogPreviewContent");
      if (storedContent) {
        const parsedContent = JSON.parse(storedContent);
        setContent(parsedContent);
      } else {
        setContent([
          {
            type: "paragraph",
            content: "No content found to preview",
          },
        ]);
      }
    } catch (error) {
      console.error("Error loading content:", error);
      setContent([
        {
          type: "paragraph",
          content: "Error loading content",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSave = async () => {
    if (content.length > 0) {
      console.log("Saving blog content:", content);
      const blogContent = localStorage.getItem("blogPreviewContent");
      // give an api call to the backend
      console.log("blogContent is : ",blogContent);
    //   const response = await axios.post(`${BACKEND_URL}/blog`,{
    //     title: blogContent[0].content.text,
    //     content:blogContent,
    //     subtitle:blogContent[1].content.text
    //   })
      alert("Blog saved successfully!");
      localStorage.removeItem("blogPreviewContent");
    }
  };

  const handleEdit = () => {
    window.location.href = "/edit";
  };

  // Function to render block content
  const renderBlock = (block: any, index: number) => {
    const getTextContent = (content: any): string => {
      if (typeof content === 'string') return content;
      if (Array.isArray(content)) {
        return content.map(item => getTextContent(item)).join('');
      }
      if (content && typeof content === 'object' && content.text) {
        return content.text;
      }
      return '';
    };

    const textContent = getTextContent(block.content);

    switch (block.type) {
      case 'heading':
        const level = block.props?.level || 1;
        const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag
            key={index}
            className={`font-bold mb-4 ${
              level === 1 ? 'text-3xl' :
              level === 2 ? 'text-2xl' :
              level === 3 ? 'text-xl' : 'text-lg'
            }`}
          >
            {textContent}
          </HeadingTag>
        );

      case 'quote':
        return (
          <blockquote 
            key={index} 
            className="border-l-4 border-blue-500 pl-4 py-2 mb-4 italic text-gray-300 bg-gray-800 rounded-r-lg"
          >
            {textContent || <em className="text-gray-500">Empty quote</em>}
          </blockquote>
        );

      case 'toggleList':
        return (
          <details key={index} className="mb-4 border border-gray-600 rounded-lg">
            <summary className="cursor-pointer p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
              {textContent || "Toggle section"}
            </summary>
            <div className="p-3 bg-gray-800 rounded-b-lg">
              {block.children?.map((child: any, childIndex: number) => 
                renderBlock(child, `${index}-${childIndex}`)
              ) || <p className="text-gray-400">No content</p>}
            </div>
          </details>
        );

      case 'numberedListItem':
        return (
          <li key={index} className="mb-2 ml-6 list-decimal">
            {textContent}
            {block.children && block.children.length > 0 && (
              <ol className="mt-2">
                {block.children.map((child: any, childIndex: number) => 
                  renderBlock(child, `${index}-${childIndex}`)
                )}
              </ol>
            )}
          </li>
        );

      case 'bulletListItem':
        return (
          <li key={index} className="mb-2 ml-6 list-disc">
            {textContent}
            {block.children && block.children.length > 0 && (
              <ul className="mt-2">
                {block.children.map((child: any, childIndex: number) => 
                  renderBlock(child, `${index}-${childIndex}`)
                )}
              </ul>
            )}
          </li>
        );

      case 'checkListItem':
        const isChecked = block.props?.checked || false;
        return (
          <div key={index} className="flex items-center mb-2">
            <input 
              type="checkbox" 
              checked={isChecked} 
              readOnly 
              className="mr-3 w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
            />
            <span className={isChecked ? 'line-through text-gray-400' : ''}>
              {textContent}
            </span>
          </div>
        );

      case 'codeBlock':
        const language = block.props?.language || 'text';
        return (
          <div key={index} className="mb-4">
            <div className="bg-gray-900 rounded-t-lg px-3 py-2 text-sm text-gray-400 border-b border-gray-700">
              {language}
            </div>
            <pre className="bg-black rounded-b-lg p-4 overflow-x-auto">
              <code className="text-green-400 text-sm font-mono">
                {textContent || '// Empty code block'}
              </code>
            </pre>
          </div>
        );

      case 'table':
        if (!block.content || !block.content.rows) {
          return (
            <div key={index} className="mb-4 p-4 border border-gray-600 rounded-lg">
              <p className="text-gray-400">Empty table</p>
            </div>
          );
        }
        
        return (
          <div key={index} className="mb-4 overflow-x-auto">
            <table className="w-full border-collapse border border-gray-600 rounded-lg">
              <tbody>
                {block.content.rows.map((row: any[], rowIndex: number) => (
                  <tr key={rowIndex} className={rowIndex === 0 ? 'bg-gray-700' : 'bg-gray-800'}>
                    {row.map((cell: any, cellIndex: number) => {
                      const CellTag = rowIndex === 0 ? 'th' : 'td';
                      return (
                        <CellTag 
                          key={cellIndex}
                          className="border border-gray-600 px-3 py-2 text-left"
                        >
                          {getTextContent(cell) || ''}
                        </CellTag>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'paragraph':
      default:
        return (
          <p key={index} className="mb-4 leading-relaxed">
            {textContent || <em className="text-gray-400">Empty paragraph</em>}
          </p>
        );
    }
  };

  // Group consecutive list items
  const groupedContent = () => {
    const grouped: any[] = [];
    let currentList: any[] = [];
    let listType: string | null = null;

    content.forEach((block, index) => {
      if (block.type === 'bulletListItem' || block.type === 'numberedListItem' || block.type === 'checkListItem') {
        if (listType === null) {
          listType = block.type;
          currentList = [block];
        } else if (listType === block.type) {
          currentList.push(block);
        } else {
          // Different list type, close current list and start new one
          grouped.push({ type: `${listType}Group`, items: currentList });
          listType = block.type;
          currentList = [block];
        }
      } else {
        // Not a list item, close any current list
        if (currentList.length > 0) {
          grouped.push({ type: `${listType}Group`, items: currentList });
          currentList = [];
          listType = null;
        }
        grouped.push(block);
      }
    });

    // Don't forget the last list if it exists
    if (currentList.length > 0) {
      grouped.push({ type: `${listType}Group`, items: currentList });
    }

    return grouped;
  };

  const renderGroupedBlock = (block: any, index: number) => {
    if (block.type === 'bulletListItemGroup') {
      return (
        <ul key={index} className="mb-4">
          {block.items.map((item: any, itemIndex: number) => 
            renderBlock(item, `${index}-${itemIndex}`)
          )}
        </ul>
      );
    } else if (block.type === 'numberedListItemGroup') {
      return (
        <ol key={index} className="mb-4">
          {block.items.map((item: any, itemIndex: number) => 
            renderBlock(item, `${index}-${itemIndex}`)
          )}
        </ol>
      );
    } else if (block.type === 'checkListItemGroup') {
      return (
        <div key={index} className="mb-4">
          {block.items.map((item: any, itemIndex: number) => 
            renderBlock(item, `${index}-${itemIndex}`)
          )}
        </div>
      );
    }
    
    return renderBlock(block, index);
  };

  if (loading) {
    return (
      <div className="h-screen flex flex-col bg-[#1e1e1e] text-white">
        <GitHubNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-xl">Loading preview...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#1e1e1e] text-white">
      <GitHubNavbar />
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4 px-6 pt-4">
        <h1 className="text-3xl font-bold text-white">👀 Preview Blog</h1>
        <div className="flex gap-3">
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            ← Edit
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            💾 Save Blog
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-auto rounded-lg border border-gray-700 bg-[#2a2a2a] mx-6">
        <div className="px-6 py-4 min-h-[400px]">
          <div className="prose prose-invert max-w-none">
            {content.length > 0 ? (
              groupedContent().map((block, index) => renderGroupedBlock(block, index))
            ) : (
              <p className="text-gray-400">No content to preview</p>
            )}
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="mt-4 text-sm text-gray-400 text-center pb-4">
        Preview mode - Content is read-only
      </div>
    </div>
  );
}



[{"id":"be6ca633-3ea3-4529-9b9b-1cb424d59156","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":1,"isToggleable":false},"content":[{"type":"text","text":"✨ Start Writing Your Blog","styles":{}}],"children":[]},{"id":"65111a70-a7b8-4d53-886d-c9508385e2ea","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"Begin writing your blog post here. You can use AI features by typing '/' to open the slash menu or selecting text and clicking the AI button in the toolbar.","styles":{}}],"children":[]}]