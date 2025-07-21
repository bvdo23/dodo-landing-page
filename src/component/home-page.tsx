"use client";

import { useTranslations } from "next-intl";
import Header from "./header";
import MainSection from "./main-section";

type DeepLinkParams = {
  redirectUrl: string;
  bankName: string; // BankNameEnum
  type: string; // DeepLinkEnum
  qrCode: string;
  clientId: string;
  timestamp: string;
};

export default function HomePage() {
  const t = useTranslations();

  interface GetDeepLinkHeaders {
    "x-client-id": string;
    "x-request-timestamp": string;
    "x-signature": string;
  }

  interface GetDeepLinkResponse {
    location: string;
  }

  async function getDeepLink(params: DeepLinkParams): Promise<string> {
    const url = new URL("http://localhost:6004/v1/deep-link");
    url.searchParams.append("redirectUrl", params.redirectUrl);
    url.searchParams.append("bankName", params.bankName);
    url.searchParams.append("type", params.type);
    url.searchParams.append("qrCode", params.qrCode);

    // Lấy dấu thời gian theo định dạng yyyyMMddHHmmssSSS
    const pad = (n: number, width: number) => n.toString().padStart(width, "0");
    const now = new Date();
    const timestamp =
      now.getFullYear().toString() +
      pad(now.getMonth() + 1, 2) +
      pad(now.getDate(), 2) +
      pad(now.getHours(), 2) +
      pad(now.getMinutes(), 2) +
      pad(now.getSeconds(), 2) +
      pad(now.getMilliseconds(), 3);

    // Chuỗi cần hash: "{x-request-timestamp}:{request body convert về string}"
    const requestBody = {
      redirectUrl: params.redirectUrl,
      bankName: params.bankName,
      type: params.type,
      qrCode: params.qrCode,
    };
    const requestBodyString = JSON.stringify(requestBody);
    const dataToSign = `${timestamp}:${requestBodyString}`;

    // HMAC SHA512 với key là Secret token
    const secret = "JSkoInvQBgRQI+8biDfdqMA6qyhTk8tm4x+5+N9y/mI=";
    // Chuyển key sang Uint8Array
    const enc = new TextEncoder();
    const key = await window.crypto.subtle.importKey(
      "raw",
      enc.encode(secret),
      { name: "HMAC", hash: "SHA-512" },
      false,
      ["sign"]
    );
    // Tạo signature
    const signatureBuffer = await window.crypto.subtle.sign(
      "HMAC",
      key,
      enc.encode(dataToSign)
    );
    // Convert signature sang base64
    const signatureArray = Array.from(new Uint8Array(signatureBuffer));
    const signature = btoa(String.fromCharCode(...signatureArray));

    const res: Response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "x-client-id": "0440bd40752203ada9855f9fdde7eb31",
        "x-request-timestamp": timestamp,
        "x-signature": signature,
      },
      redirect: "manual", // Để lấy URL redirect thay vì tự động chuyển hướng
    });

    // Nếu backend trả về redirect, lấy URL từ header Location
    if (res.status === 302) {
      return res.headers.get("Location") as string;
    }
    throw new Error("Không lấy được deeplink");
  }

  return (
    <>
      <a
        href="
          https://l1h800nt-6004.asse.devtunnels.ms/v1/deep-link?redirectUrl=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DHBhggSpKubU%26ab_channel%3DFEsports&bankName=ACB&type=qr-code&qrCode=sample-qr-code"
      >
        click
      </a>
    </>
    // <div className="min-h-screen flex flex-col">
    //   <Header />

    //   <button
    //     className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition mb-4"
    //     onClick={async () => {
    //       window.confirm("Click to get deep link") &&
    //         console.log("Getting deep link...");
    //       const deepLink = await getDeepLink({
    //         redirectUrl:
    //           "https://www.youtube.com/watch?v=HBhggSpKubU&ab_channel=FEsports",
    //         bankName: "ACB",
    //         type: "qr-code",
    //         qrCode: "sample-qr-code",
    //         clientId: "0440bd40752203ada9855f9fdde7eb31",
    //         timestamp: new Date().toISOString(),
    //       });
    //       console.log(deepLink);
    //     }}
    //   >
    //     click
    //   </button>
    //   <main className="flex-grow">
    //     <MainSection />

    //     {/* About Section */}
    //     <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
    //       <div className="container mx-auto px-6">
    //         <h2 className="text-3xl font-bold mb-10 text-center">
    //           {t("about.title")}
    //         </h2>
    //         <div className="max-w-3xl mx-auto">
    //           <p className="text-lg mb-6">{t("about.description")}</p>
    //           <div className="mt-8">
    //             <h3 className="font-bold text-xl mb-2">
    //               {t("about.education")}
    //             </h3>
    //             <p className="font-medium">{t("about.educationDetail")}</p>
    //             <p>{t("about.major")}</p>
    //           </div>
    //         </div>
    //       </div>
    //     </section>

    //     {/* Skills Section */}
    //     <section id="skills" className="py-20">
    //       <div className="container mx-auto px-6">
    //         <h2 className="text-3xl font-bold mb-10 text-center">
    //           {t("skills.title")}
    //         </h2>
    //         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    //           <div className="p-6 border border-gray-200 rounded-lg shadow-sm">
    //             <h3 className="font-bold text-xl mb-3">
    //               {t("skills.languages")}
    //             </h3>
    //             <p>{t("skills.languagesDetail")}</p>
    //           </div>
    //           <div className="p-6 border border-gray-200 rounded-lg shadow-sm">
    //             <h3 className="font-bold text-xl mb-3">
    //               {t("skills.databases")}
    //             </h3>
    //             <p>{t("skills.databasesDetail")}</p>
    //           </div>
    //           <div className="p-6 border border-gray-200 rounded-lg shadow-sm">
    //             <h3 className="font-bold text-xl mb-3">
    //               {t("skills.technologies")}
    //             </h3>
    //             <p>{t("skills.technologiesDetail")}</p>
    //           </div>
    //           <div className="p-6 border border-gray-200 rounded-lg shadow-sm md:col-span-2 lg:col-span-3">
    //             <h3 className="font-bold text-xl mb-3">
    //               {t("skills.specialization")}
    //             </h3>
    //             <ul className="list-disc pl-5 space-y-2">
    //               <li>
    //                 <span className="font-medium">{t("skills.frontend")}</span>
    //               </li>
    //               <li>
    //                 <span className="font-medium">{t("skills.backend")}</span>
    //               </li>
    //               <li>
    //                 <span className="font-medium">{t("skills.other")}</span>
    //               </li>
    //             </ul>
    //           </div>
    //         </div>
    //       </div>
    //     </section>

    //     {/* Experience Section */}
    //     <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-900">
    //       <div className="container mx-auto px-6">
    //         <h2 className="text-3xl font-bold mb-10 text-center">
    //           {t("experience.title")}
    //         </h2>
    //         <div className="space-y-12">
    //           <div className="border-l-4 border-blue-600 pl-4">
    //             <h3 className="text-xl font-bold">
    //               {t("experience.job1.company")}
    //             </h3>
    //             <p className="text-blue-600 font-medium">
    //               {t("experience.job1.position")}
    //             </p>
    //             <p className="text-gray-500 mb-3">
    //               {t("experience.job1.period")}
    //             </p>
    //             <ul className="list-disc pl-5 space-y-1">
    //               {[1, 2, 3, 4, 5].map((i) => (
    //                 <li key={i}>{t(`experience.job1.duties.${i - 1}`)}</li>
    //               ))}
    //             </ul>
    //           </div>
    //           <div className="border-l-4 border-blue-600 pl-4">
    //             <h3 className="text-xl font-bold">
    //               {t("experience.job2.company")}
    //             </h3>
    //             <p className="text-blue-600 font-medium">
    //               {t("experience.job2.position")}
    //             </p>
    //             <p className="text-gray-500 mb-3">
    //               {t("experience.job2.period")}
    //             </p>
    //             <ul className="list-disc pl-5 space-y-1">
    //               {[1, 2, 3].map((i) => (
    //                 <li key={i}>{t(`experience.job2.duties.${i - 1}`)}</li>
    //               ))}
    //             </ul>
    //           </div>
    //         </div>
    //       </div>
    //     </section>

    //     {/* Projects Section */}
    //     <section id="projects" className="py-20">
    //       <div className="container mx-auto px-6">
    //         <h2 className="text-3xl font-bold mb-10 text-center">
    //           {t("projects.title")}
    //         </h2>
    //         <div className="space-y-16">
    //           <div className="grid md:grid-cols-2 gap-8 items-center">
    //             <div>
    //               <h3 className="text-2xl font-bold">
    //                 {t("projects.project1.name")}
    //               </h3>
    //               <p className="text-blue-600 font-medium">
    //                 {t("projects.project1.position")}
    //               </p>
    //               <p className="text-gray-500 mb-3">
    //                 {t("projects.project1.period")}
    //               </p>
    //               <p className="mb-4">{t("projects.project1.description")}</p>
    //               <h4 className="font-semibold mb-2">Responsibilities:</h4>
    //               <ul className="list-disc pl-5 space-y-1 mb-4">
    //                 {[1, 2, 3, 4].map((i) => (
    //                   <li key={i}>{t(`projects.project1.duties.${i - 1}`)}</li>
    //                 ))}
    //               </ul>
    //               <p>
    //                 <span className="font-medium">Team Size:</span>{" "}
    //                 {t("projects.project1.teamSize")}
    //               </p>
    //               <p>
    //                 <span className="font-medium">Technologies:</span>{" "}
    //                 {t("projects.project1.technologies")}
    //               </p>
    //               <p className="mt-2">
    //                 <a
    //                   href={t("projects.project1.url")}
    //                   target="_blank"
    //                   rel="noopener noreferrer"
    //                   className="text-blue-600 hover:underline"
    //                 >
    //                   {t("projects.project1.url")}
    //                 </a>
    //               </p>
    //             </div>
    //             <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
    //               <span className="text-gray-400">Project Screenshot</span>
    //             </div>
    //           </div>

    //           <div className="grid md:grid-cols-2 gap-8 items-center">
    //             <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center md:order-1">
    //               <span className="text-gray-400">Project Screenshot</span>
    //             </div>
    //             <div className="md:order-2">
    //               <h3 className="text-2xl font-bold">
    //                 {t("projects.project2.name")}
    //               </h3>
    //               <p className="text-blue-600 font-medium">
    //                 {t("projects.project2.position")}
    //               </p>
    //               <p className="text-gray-500 mb-3">
    //                 {t("projects.project2.period")}
    //               </p>
    //               <p className="mb-4">{t("projects.project2.description")}</p>
    //               <h4 className="font-semibold mb-2">Responsibilities:</h4>
    //               <ul className="list-disc pl-5 space-y-1 mb-4">
    //                 <li>{t("projects.project2.duties.0")}</li>
    //               </ul>
    //               <p>
    //                 <span className="font-medium">Team Size:</span>{" "}
    //                 {t("projects.project2.teamSize")}
    //               </p>
    //               <p>
    //                 <span className="font-medium">Technologies:</span>{" "}
    //                 {t("projects.project2.technologies")}
    //               </p>
    //             </div>
    //           </div>

    //           <div className="grid md:grid-cols-2 gap-8 items-center">
    //             <div>
    //               <h3 className="text-2xl font-bold">
    //                 {t("projects.project3.name")}
    //               </h3>
    //               <p className="text-blue-600 font-medium">
    //                 {t("projects.project3.position")}
    //               </p>
    //               <p className="text-gray-500 mb-3">
    //                 {t("projects.project3.period")}
    //               </p>
    //               <p className="mb-4">{t("projects.project3.description")}</p>
    //               <h4 className="font-semibold mb-2">Responsibilities:</h4>
    //               <ul className="list-disc pl-5 space-y-1 mb-4">
    //                 {[1, 2].map((i) => (
    //                   <li key={i}>{t(`projects.project3.duties.${i - 1}`)}</li>
    //                 ))}
    //               </ul>
    //               <p>
    //                 <span className="font-medium">Team Size:</span>{" "}
    //                 {t("projects.project3.teamSize")}
    //               </p>
    //               <p>
    //                 <span className="font-medium">Technologies:</span>{" "}
    //                 {t("projects.project3.technologies")}
    //               </p>
    //               <p className="mt-2">
    //                 <a
    //                   href={t("projects.project3.url")}
    //                   target="_blank"
    //                   rel="noopener noreferrer"
    //                   className="text-blue-600 hover:underline"
    //                 >
    //                   {t("projects.project3.url")}
    //                 </a>
    //               </p>
    //             </div>
    //             <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
    //               <span className="text-gray-400">Project Screenshot</span>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </section>

    //     {/* Contact Section */}
    //     <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
    //       <div className="container mx-auto px-6">
    //         <h2 className="text-3xl font-bold mb-10 text-center">
    //           {t("contact.title")}
    //         </h2>
    //         <div className="grid md:grid-cols-2 gap-12">
    //           <div>
    //             <div className="mb-6">
    //               <h3 className="font-bold text-lg mb-2">
    //                 {t("contact.phone")}
    //               </h3>
    //               <p className="text-xl">{t("contact.phoneValue")}</p>
    //             </div>
    //             <div className="mb-6">
    //               <h3 className="font-bold text-lg mb-2">
    //                 {t("contact.email")}
    //               </h3>
    //               <p className="text-xl">{t("contact.emailValue")}</p>
    //             </div>
    //             <div>
    //               <h3 className="font-bold text-lg mb-2">
    //                 {t("contact.address")}
    //               </h3>
    //               <p className="text-xl">{t("contact.addressValue")}</p>
    //             </div>
    //           </div>
    //           <div>
    //             <h3 className="font-bold text-lg mb-4">
    //               {t("contact.message")}
    //             </h3>
    //             <form className="space-y-4">
    //               <div>
    //                 <label className="block mb-1">
    //                   {t("contact.yourName")}
    //                 </label>
    //                 <input type="text" className="w-full p-2 border rounded" />
    //               </div>
    //               <div>
    //                 <label className="block mb-1">
    //                   {t("contact.yourEmail")}
    //                 </label>
    //                 <input type="email" className="w-full p-2 border rounded" />
    //               </div>
    //               <div>
    //                 <label className="block mb-1">
    //                   {t("contact.yourMessage")}
    //                 </label>
    //                 <textarea className="w-full p-2 border rounded h-32"></textarea>
    //               </div>
    //               <button
    //                 type="submit"
    //                 className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition"
    //               >
    //                 {t("contact.send")}
    //               </button>
    //             </form>
    //           </div>
    //         </div>
    //       </div>
    //     </section>
    //   </main>

    //   <footer className="bg-gray-900 text-white py-12">
    //     <div className="container mx-auto px-6">
    //       <div className="flex flex-col md:flex-row justify-between items-center">
    //         <div className="mb-4 md:mb-0">
    //           <h3 className="text-2xl font-bold">Do Bui Van</h3>
    //           <p className="text-gray-400">Full-Stack Developer</p>
    //         </div>
    //         <div className="flex space-x-6">
    //           <a
    //             href="https://github.com/bvdo23"
    //             target="_blank"
    //             rel="noopener noreferrer"
    //             className="text-white hover:text-blue-400 transition"
    //           >
    //             <svg
    //               className="w-6 h-6"
    //               fill="currentColor"
    //               viewBox="0 0 24 24"
    //               aria-hidden="true"
    //             >
    //               <path
    //                 fillRule="evenodd"
    //                 d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    //                 clipRule="evenodd"
    //               ></path>
    //             </svg>
    //           </a>
    //           <a
    //             href="https://www.linkedin.com/in/do-bui-van/"
    //             target="_blank"
    //             rel="noopener noreferrer"
    //             className="text-white hover:text-blue-400 transition"
    //           >
    //             <svg
    //               className="w-6 h-6"
    //               fill="currentColor"
    //               viewBox="0 0 24 24"
    //               aria-hidden="true"
    //             >
    //               <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    //             </svg>
    //           </a>
    //         </div>
    //       </div>
    //       <div className="border-t border-gray-700 mt-8 pt-8 text-center">
    //         <p>© 2025 DODO All rights reserved.</p>
    //       </div>
    //     </div>
    //   </footer>
    // </div>
  );
}
