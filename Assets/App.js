const accessKey = "-bk7mkyOIL-z1NSq3gLt3DpaEP_E71rd1MsFZyRCe2s";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImage() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    try {
        const response = await fetch(url);
        
        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Clear previous results if this is the first page
        if (page === 1) {
            searchResult.innerHTML = "";
        }

        // Check if there are results in the response
        if (data.results && data.results.length > 0) {
            const results = data.results;
            results.forEach((result) => {
                const image = document.createElement("img");
                image.src = result.urls.small;
                const imageLink = document.createElement("a");
                imageLink.href = result.links.html;
                imageLink.target = "_blank";
                imageLink.appendChild(image);
                searchResult.appendChild(imageLink);
            });

            // Show the "Show More" button if there are more results
            if (data.total_pages > page) {
                showMoreBtn.style.display = "block";
            } else {
                showMoreBtn.style.display = "none";
            }
        } else {
            searchResult.innerHTML = "<p>No images found. Try a different search term.</p>";
            showMoreBtn.style.display = "none";
        }

    } catch (error) {
        console.error("Error fetching images:", error);
        searchResult.innerHTML = `<p>Error fetching images: ${error.message}</p>`;
        showMoreBtn.style.display = "none";
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImage();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImage();
});
