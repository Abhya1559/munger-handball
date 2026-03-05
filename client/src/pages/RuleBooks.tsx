import {
  BookOpen,
  Download,
  Search,
  FileText,
  Eye,
  Filter,
} from "lucide-react";
import { Button } from "@heroui/button";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import book from "@/assets/Book.pdf";
import book1 from "@/assets/Book1.pdf";
import book2 from "@/assets/book2.pdf";
import score from "@/assets/score-sheet.pdf";
// 1. Update this array with your actual PDF paths
const rules = [
  {
    id: 1,
    title: "Official Handball Rules 2024",
    category: "Game Play",
    version: "v4.2",
    updatedAt: new Date().toLocaleDateString("en-GB"),
    status: "Active",
    fileUrl: book, // Path to your PDF
  },
  {
    id: 2,
    title: "AN INTRODUCTION TO SPORTS ETHICS",
    category: "Ethics",
    version: "v1.0",
    updatedAt: new Date().toLocaleDateString("en-GB"),
    status: "Active",
    fileUrl: book1,
  },
  {
    id: 3,
    title: "Equipment & Jersey Standards",
    category: "Technical",
    version: "v2.1",
    updatedAt: new Date().toLocaleDateString("en-GB"),
    status: "Updated",
    fileUrl: book2,
  },
  {
    id: 4,
    title: "Score sheet",
    category: "Technical",
    version: "v2.1",
    updatedAt: new Date().toLocaleDateString("en-GB"),
    status: "Updated",
    fileUrl: score,
  },
];

export default function RuleBook() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedFile, setSelectedFile] = useState<(typeof rules)[0] | null>(
    null,
  );
  const [query, setQuery] = useState<string>("");
  const handleViewPdf = (rule: (typeof rules)[0]) => {
    setSelectedFile(rule);
    onOpen();
  };

  const handleChange = (e: any) => {
    setQuery(e.target.value.toLowerCase());
  };

  const findBook = rules.filter((item) => {
    return item.title.toLocaleLowerCase().includes(query);
  });
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <BookOpen className="text-orange-500" size={36} />
              Rule Book
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Access and download official Munger Handball Association
              documentation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-64">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search rules..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all text-sm"
              />
            </div>
            <Button
              isIconOnly
              variant="flat"
              className="bg-white border border-slate-200 rounded-xl"
            >
              <Filter size={20} className="text-slate-600" />
            </Button>
          </div>
        </div>
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">
                    Document
                  </th>
                  <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest hidden sm:table-cell">
                    Category
                  </th>
                  <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest hidden lg:table-cell">
                    Updated
                  </th>
                  <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {findBook.map((rule) => (
                  <tr
                    key={rule.id}
                    className="group hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-orange-50 text-orange-600 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-all shadow-sm">
                          <FileText size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 leading-tight">
                            {rule.title}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Version {rule.version}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 hidden sm:table-cell">
                      <span className="text-sm font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
                        {rule.category}
                      </span>
                    </td>
                    <td className="px-6 py-6 text-sm font-medium text-slate-500 hidden lg:table-cell">
                      {rule.updatedAt}
                    </td>
                    <td className="px-6 py-6">
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          rule.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {rule.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        {/* VIEW BUTTON */}
                        <Button
                          onPress={() => handleViewPdf(rule)}
                          className="min-w-0 h-10 px-4 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-orange-500 hover:text-white transition-all flex items-center gap-2"
                        >
                          <Eye size={16} />
                          <span className="hidden md:inline">View</span>
                        </Button>

                        {/* DOWNLOAD LINK */}
                        <a
                          href={rule.fileUrl}
                          download
                          className="h-10 w-10 flex items-center justify-center bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                        >
                          <Download size={18} />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PDF PREVIEW MODAL */}
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size="5xl"
          scrollBehavior="inside"
          className="rounded-[2rem]"
          backdrop="blur"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 px-8 pt-8">
                  <h2 className="text-2xl font-black text-slate-900">
                    {selectedFile?.title}
                  </h2>
                  <p className="text-sm text-slate-500 font-medium">
                    Document Preview • {selectedFile?.version}
                  </p>
                </ModalHeader>
                <ModalBody className="p-4 md:p-8">
                  {selectedFile ? (
                    <div className="w-full h-[60vh] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
                      <iframe
                        src={`${selectedFile.fileUrl}#toolbar=0`}
                        className="w-full h-full"
                        title="PDF Preview"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-64 text-slate-400">
                      Loading preview...
                    </div>
                  )}
                </ModalBody>
                <ModalFooter className="px-8 pb-8">
                  <Button
                    variant="light"
                    className="font-bold text-slate-500"
                    onPress={onClose}
                  >
                    Close
                  </Button>
                  <Button
                    as="a"
                    href={selectedFile?.fileUrl}
                    download
                    className="bg-orange-500 text-white font-bold px-6 rounded-xl shadow-lg shadow-orange-100"
                  >
                    Download PDF
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
