const urlParams = new URLSearchParams(window.location.search);
const accessToken = urlParams.get("access_token");

if (!accessToken) {
  window.location.href = "/login";
} else {
  fetch("/home?" + new URLSearchParams({ access_token: accessToken }))
    .then((response) => response.json())
    .then((tracks) => {
      const tracksDiv = document.getElementById("tracks");
      tracks.forEach((track) => {
        const trackDiv = document.createElement("div");
        trackDiv.classList.add("track");
        trackDiv.innerHTML = `
                            <h2>${track.name}</h2>
                            <p>Artist: ${track.artist}</p>
                            <p>Album: ${track.album}</p>
                            ${
                              track.preview_url
                                ? `<audio controls src="${track.preview_url}"></audio>`
                                : "<p>No preview available</p>"
                            }
                        `;
        tracksDiv.appendChild(trackDiv);
      });
    })
    .catch((error) => console.error("Error fetching tracks:", error));
}
