import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function PropertyTabs({ descriptionParagraphs = [], floorPlan, mapQuery }) {
  // Encode the map query so it is safe inside a URL (spaces, commas, etc.)
  const query = encodeURIComponent(mapQuery || "");

  return (
    <div className="tabsWrap">
      <Tabs>
        {/* The clickable tab buttons */}
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor plan</Tab>
          <Tab>Map</Tab>
        </TabList>

        {/* Panel 1: Full property description */}
        <TabPanel>
          <div className="tabPanel">
            {descriptionParagraphs.length === 0 ? (
              <p className="mutedText">No description available.</p>
            ) : (
              descriptionParagraphs.map((p, idx) => <p key={idx}>{p}</p>)
            )}
          </div>
        </TabPanel>

        {/* Panel 2: Floor plan image (loaded from public/images) */}
        <TabPanel>
          <div className="tabPanel">
            {floorPlan ? (
              <img
                className="floorPlanImg"
                // BASE_URL keeps this working on nested routes + GitHub Pages
                src={`${import.meta.env.BASE_URL}${floorPlan}`}
                alt="Floor plan"
              />
            ) : (
              <p className="mutedText">No floor plan available.</p>
            )}
          </div>
        </TabPanel>

        {/* Panel 3: Google Maps embed (no API key needed) */}
        <TabPanel>
          <div className="tabPanel">
            {mapQuery ? (
              <div className="mapWrap">
                <iframe
                  title="Google map"
                  className="mapFrame"
                  loading="lazy"
                  // Simple privacy-friendly referrer policy
                  referrerPolicy="no-referrer-when-downgrade"
                  // Search-based map embed using the property location text
                  src={`https://www.google.com/maps?q=${query}&output=embed`}
                />
              </div>
            ) : (
              <p className="mutedText">No map available.</p>
            )}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default PropertyTabs;
