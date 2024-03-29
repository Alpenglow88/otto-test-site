async function init() {
  // Install built-in polyfills to patch browser incompatibilities.
  shaka.polyfill.installAll();
  // Check to see if the browser supports the basic APIs Shaka needs.
  if (shaka.Player.isBrowserSupported()) {
    // Everything looks good!
  } else {
    // This browser does not have the minimum set of APIs we need.
    const browser = checkBrowser();
    console.error(`${browser} browser not supported!`);
  }
  // When using the UI, the player is made automatically by the UI object.
  const video = document.getElementById("video-player");
  const ui = video["ui"];
  const controls = ui.getControls();
  const player = controls.getPlayer();

  const uiConfig = {
    // addBigPlayButton: true,
    controlPanelElements: [
      "rewind",
      "play_pause",
      "fast_forward",
      "time_and_duration",
      "spacer",
      "mute",
      "volume",
      "overflow_menu",
      "fullscreen",
    ],
    overflowMenuButtons: [
      "captions",
      "quality",
      "language",
      "picture_in_picture",
      "cast",
      "playback_rate",
      "loop",
    ],
    seekBarColors: {
      base: "rgba(255, 255, 255, 0.3)",
      buffered: "rgba(255, 255, 255, 0.54)",
      played: "rgb(64,224,208)",
    },
  };
  ui.configure(uiConfig);

  player.configure({
    streaming: {
      retryParameters: {
        maxAttempts: 3,
      },
    },
    manifest: {
      retryParameters: {
        maxAttempts: 3,
      },
    },
    drm: {
      servers: {
        'com.widevine.alpha': 'https://cwip-shaka-proxy.appspot.com/cookie_auth',
      }
    }
  });

  // Attach player and ui to the window to make it easy to access in the JS console.
  window.player = player;
  window.ui = ui;

  // Listen for error events.
  player.addEventListener("error", onPlayerErrorEvent);
  controls.addEventListener("error", onUIErrorEvent);
  // player.addEventListener("buffering", onBufferingEvent);

  player.getNetworkingEngine().registerRequestFilter(function(type, request) {
    if (type == shaka.net.NetworkingEngine.RequestType.LICENSE) {
      request.allowCrossSiteCredentials = true;
    }
  });
}



function checkBrowser() {
  navigator.sayswho = (function () {
    var ua = navigator.userAgent,
      tem,
      M =
        ua.match(
          /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
        ) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return "IE " + (tem[1] || "");
    }
    if (M[1] === "Chrome") {
      tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem != null) return tem.slice(1).join(" ").replace("OPR", "Opera");
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join(" ");
  })();

  return navigator.sayswho;
}

async function loadPlayer(manifest, offset) {
  try {
    await player.load(manifest, offset);
    console.log("Video loaded");
  } catch (error) {
    if (error.code == 7000) {
      // Debug code
      // console.warn(
      // "LOAD_INTERRUPTED (7000) - The call to Player.load() was interrupted by a call to Player.unload() or another call to Player.load().");
    } else {
      onPlayerError(error);
    }
  }
}

function onBufferingEvent(bufferingEvent) {
  if (bufferingEvent.buffering === true) {
    console.log(bufferingEvent.type, bufferingEvent.buffering);
  }
}

function onPlayerErrorEvent(errorEvent) {
  // Extract the shaka.util.Error object from the event.
  onPlayerError(errorEvent.detail);
}

function onPlayerError(error) {
  // Handle player error
  console.error("Error code", error.code, "object", error);
  document.getElementById("video-player").poster =
    "./assets/generic_error_2.png";
  player.unload();

  var error_display = document.getElementById("error_code");
  error_display.innerText = "Error Code: " + error.code;
  error_display.style.display = "block";
}

function onUIErrorEvent(errorEvent) {
  // Extract the shaka.util.Error object from the event.
  onPlayerError(errorEvent.detail);
}

function initFailed(errorEvent) {
  // Handle the failure to load; errorEvent.detail.reasonCode has a
  // shaka.ui.FailReasonCode describing why.
  console.error("Unable to load the UI library!");
}

// Listen to the custom shaka-ui-loaded event, to wait until the UI is loaded.
document.addEventListener("shaka-ui-loaded", init);
// Listen to the custom shaka-ui-load-failed event, in case Shaka Player fails
// to load (e.g. due to lack of browser support).
document.addEventListener("shaka-ui-load-failed", initFailed);
