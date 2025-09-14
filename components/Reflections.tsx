import { useEffect, useState } from "react";
import { getUserInfo } from "@/lib/user";
import { supabase } from "@/lib/supabaseClient";

export default function Reflections() {
  const { name, type } = getUserInfo();
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");

  const canSave = type === "basic" || type === "pro";

  const handleSave = async () => {
    if (!canSave) {
      setStatus("Gemning er kun muligt for Basic- eller Pro-brugere.");
      return;
    }

    const { error } = await supabase.from("reflections").insert({
      user_id: name,
      content: text,
      created_at: new Date().toISOString(),
    });

    if (error) {
      setStatus("Fejl ved gemning.");
    } else {
      setStatus("Refleksion gemt ✅");
    }
  };

  return (
    <div className="p-4 border rounded-xl bg-white shadow-md">
      <h2 className="text-xl font-semibold mb-2">Refleksion</h2>
      <p className="text-sm mb-1 text-gray-500">Bruger: {name} ({type})</p>
      <textarea
        className="w-full p-2 border rounded"
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Skriv din refleksion her..."
      />
      <button
        onClick={handleSave}
        className={`mt-2 px-4 py-2 rounded ${
          canSave ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
        disabled={!canSave}
      >
        Gem
      </button>
      <p className="text-sm text-green-600 mt-2">{status}</p>
    </div>
  );
}
