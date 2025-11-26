// assets/custom.js

//console.log("[Homer] custom.js loaded");

function onReady(fn) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fn);
  } else {
    fn();
  }
}

onReady(function () {
  // console.log("[Homer] DOM ready in custom.js");

  // Map category titles (exact visible text) -> id
	const groupMap = {
	  
	  "Audio Editing": "audio-editing",
	  
	  "Web Browsers": "web-browsers",

	  "Online Media Streaming, Podcasts & Downloaders":
		"online-media-streaming-podcasts-downloaders",

	  "Local Media Streaming & Playback":
		"local-media-streaming-playback",

	  "Video Editing & Broadcasting":
		"video-editing-broadcasting",

	  "Social": "social",

	  "Photo Editing & Drawing Tools":
		"photo-editing-drawing-tools",

	  "Design": "design",

	  "Compression": "compression",

	  "Office": "office",

	  "Tools": "tools",

	  "Cross-Device Integration":
		"cross-device-integration",

	  "VPN": "vpn",

	  "Network & Cloud Storage":
		"network-cloud-storage",

	  "Coding": "coding",

	  "Emulation & Virtualization":
		"emulation-virtualization",

	  "Benchmarking & Diagnostics":
		"benchmarking-diagnostics",

	  "Security & Protection":
		"security-protection",

	  "Theme & Styles":
		"theme-styles",

	  "Other": "other",

	  "Game Console Emulation":
		"game-console-emulation",

	  "Games": "games",

	  "Chess / شطرنج":
		"chess",

	  "Artificial Intelligence":
		"artificial-intelligence",

	  "Drivers": "drivers",

	  "Printers": "printers"//
	};


  // Attach click handler directly to a ?sec=... link
  function attachJumpHandler(link) {
    if (!link || link.dataset.secJumpAttached === "1") return;

    const rawHref = link.getAttribute("href") || "";
    if (!rawHref.includes("?sec=")) return;

    //console.log("[Homer] Attaching jump handler to", rawHref);

    link.addEventListener(
      "click",
      function (e) {
        //console.log("[Homer] ?sec link clicked:", rawHref);

        e.preventDefault();
        e.stopPropagation(); // block Homer/SPA handling + default nav

        // Extract the query (?sec=...)
        const queryPart = rawHref.includes("?")
          ? rawHref.slice(rawHref.indexOf("?"))
          : rawHref;
        const params = new URLSearchParams(queryPart.replace(/^\?/, ""));
        const sec = params.get("sec");
        if (!sec) return;

        // Update URL (bookmarkable) without reload
        const url = new URL(window.location.href);
        url.searchParams.set("sec", sec);
        history.pushState({}, "", url.toString());

        const targetEl = document.getElementById(sec);
        if (targetEl) {
          //console.log("[Homer] Scrolling to section:", sec);
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          console.log("[Homer] No element with id", sec, "yet");
        }
      },
      true // capture on the element
    );

    // Mark so we don’t attach twice
    link.dataset.secJumpAttached = "1";
  }

  // Scroll to section based on current ?sec=...
  function scrollToSecFromLocation(attempt) {
    attempt = attempt || 0;
    const params = new URLSearchParams(window.location.search);
    const sec = params.get("sec");
    if (!sec) return;

    const el = document.getElementById(sec);
    if (el) {
      //console.log("[Homer] Scroll to (from URL)", sec);
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (attempt < 10) {
      setTimeout(function () {
        scrollToSecFromLocation(attempt + 1);
      }, 200);
    }
  }

  // Initial scroll after load
  setTimeout(function () {
    scrollToSecFromLocation(0);
  }, 300);

  // Back/forward
  window.addEventListener("popstate", function () {
    scrollToSecFromLocation(0);
  });

  // MutationObserver: tag headings + attach handlers to buttons as they appear
  const observer = new MutationObserver(function () {
    // 1) Tag category headings
    const headings = document.querySelectorAll("h2.group-title");
    headings.forEach(function (h2) {
      const txt = (h2.textContent || "").trim();
      const id = groupMap[txt];
      if (!id) return;
      if (!h2.id) {
        h2.id = id;
		
        //console.log("[Homer] Assigned id", id, "to heading", txt);
      }
    });

    // 2) Attach handlers to any links with ?sec=...
    const jumpLinks = document.querySelectorAll('a[href*="?sec="]');
    jumpLinks.forEach(attachJumpHandler);
  });

  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
    //console.log("[Homer] MutationObserver attached");
  } else {
    console.warn("[Homer] document.body missing when attaching observer");
  }

  // Also run once immediately in case elements are already there
  (function initialScan() {
    const headings = document.querySelectorAll("h2.group-title");
    headings.forEach(function (h2) {
      const txt = (h2.textContent || "").trim();
      const id = groupMap[txt];
      if (!id) return;
      if (!h2.id) {
        h2.id = id;
        //console.log("[Homer] Assigned id", id, "to heading", txt);
      }
    });

    const jumpLinks = document.querySelectorAll('a[href*="?sec="]');
    jumpLinks.forEach(attachJumpHandler);
  })();
});
