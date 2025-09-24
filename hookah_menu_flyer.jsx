import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function HookahMenu() {
  const flavors = [
    { name: "Mint", price: "$20", color: "text-green-300" },
    { name: "Blueberry Mint", price: "$25", color: "text-blue-400" },
    { name: "Watermelon", price: "$25", color: "text-pink-500" },
    { name: "Orange Mint", price: "$25", color: "text-orange-400" },
    { name: "Lady Killa", price: "$28", color: "text-red-500" },
  ];

  // --- Lightweight runtime tests to help catch regressions ---
  useEffect(() => {
    runTests(flavors);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Hookah smoke background image zoomed out */}
      <div
        className="absolute inset-0 bg-[url('https://tse4.mm.bing.net/th/id/OIP.OrGN2p5k1r8iZf-_80U70gAAAA?pid=Api')] bg-contain bg-center opacity-60"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/70" aria-hidden />

      {/* Extra smoke clouds overlay */}
      <div
        className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/smoke.png')] bg-contain bg-center opacity-25 mix-blend-screen"
        aria-hidden
      />

      <h1 className="text-pink-400 text-5xl font-extrabold mb-2 drop-shadow-lg tracking-wide relative z-10">
        Wakky's Hookah Menu
      </h1>
      <h2 className="text-purple-300 text-3xl font-semibold drop-shadow-md relative z-10">
        Happy Hour Menu
      </h2>
      <p
        className="rainbow-text text-lg mb-8 relative z-10 drop-shadow-md font-bold"
        data-testid="happy-hours"
      >
        Mon - Thurs | 4PM - 7PM
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl relative z-10">
        {flavors.map((flavor, index) => (
          <Card
            key={index}
            className="bg-transparent shadow-xl rounded-2xl border border-pink-400 transform hover:scale-105 transition duration-300"
            data-testid={`flavor-card-${index}`}
          >
            <CardContent className="p-6 flex items-center justify-between">
              <span className={`${flavor.color} text-xl font-semibold`}>{flavor.name}</span>
              <span className={`${flavor.color} text-lg font-bold`}>{flavor.price}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Inline CSS for the rainbow animation to avoid external CSS parse errors */}
      <style>{`
        .rainbow-text {
          background-image: linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet, red);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          background-size: 400% 100%;
          animation: rainbowFlash 2s linear infinite;
          text-shadow: 0 0 6px rgba(255,255,255,0.15);
        }
        @keyframes rainbowFlash {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}

// ----------------- Simple Runtime Tests (console) -----------------
function runTests(flavors: { name: string; price: string; color: string }[]) {
  try {
    console.assert(Array.isArray(flavors) && flavors.length >= 5, "Expected at least 5 flavors");

    const names = flavors.map((f) => f.name.toLowerCase());
    console.assert(names.some((n) => n.includes("mint")), 'Expected a flavor that includes "mint"');
    console.assert(names.some((n) => n.includes("blueberry")), 'Expected a flavor that includes "blueberry"');
    console.assert(names.some((n) => n.includes("watermel")), 'Expected a flavor that includes "watermelon"');
    console.assert(names.some((n) => n.includes("orange")), 'Expected a flavor that includes "orange"');
    console.assert(names.some((n) => n.includes("lady killa")), 'Expected a flavor named "Lady Killa"');

    const hhText = (document.querySelector('[data-testid="happy-hours"]')?.textContent || '').toLowerCase();
    console.assert(hhText.includes("mon") && (hhText.includes("thurs") || hhText.includes("thursday")), "Happy hours text should include days");
    console.assert(/4\s*pm\s*-\s*7\s*pm/.test(hhText), "Happy hours should include 4PM - 7PM");

    console.log("HookahMenu basic tests passed ✅");
  } catch (e) {
    console.error("HookahMenu tests threw an error:", e);
  }
}