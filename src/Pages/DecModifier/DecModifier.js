import React, { useEffect, useState } from "react";
import { PDFViewer, PDFDownloadLink, Text, View, Document, StyleSheet, Page, Image } from '@react-pdf/renderer';

// Maximum characters allowed
const MAX_CHARACTERS = 1350;

// Award images
const awardImages = {
  "Meritorious Service Medal": "path/to/msm_image.jpg",
  "Air Force Commendation Medal": "path/to/afcm_image.jpg",
  "Air Force Achievement Medal": "path/to/afam_image.jpg"
};

// Create styles for the PDF document
const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    fontFamily: 'Times-Roman',
    flexDirection: 'column',
    padding: 40, // This will give you a 1-inch margin on all sides on A4 size
    backgroundColor: '#FFFFFF',
  },
  section: {
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    alignSelf: 'center'
  },
  citationHeader: {
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  citationBody: {
    textAlign: 'justify',
    marginBottom: 20,
  },
  closingSentence: {
    textAlign: 'center',
    marginTop: 20,
  },
  centeredText: {
    textAlign: 'center',
    marginBottom: 20,
  },
  characterCounter: {
    textAlign: 'right',
    fontSize: '12px',
    color: '#777777',
    marginBottom: '10px',
  },
  signatureBlock: {
    marginTop: 30,
    textAlign: 'center',
    marginBottom: 20,
  },
  specialOrderSection: {
    marginTop: 20,
    fontSize: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  specialOrderItem: {
    marginBottom: 5,
  }
});

// Create Document Component
const MyDocument = ({ data, showImage }) => (
  <Document>
    <Page size="LETTER" style={styles.page}>
      {showImage && awardImages[data.awardType] && (
        <View style={styles.section}>
          <Image style={styles.image} src={awardImages[data.awardType]} />
        </View>
      )}
      <View style={styles.citationHeader}>
        <Text>CITATION TO ACCOMPANY THE AWARD OF</Text>
        <Text>{data.awardType || "THE MERITORIOUS SERVICE MEDAL"}</Text>
        {data.multiplier > 1 && <Text>(FIRST OAKLEAF CLUSTER)</Text>}
      </View>

      <View style={styles.centeredText}>
        <Text>{data.name || "James V. Holver"}</Text>
      </View>

      <View style={styles.citationBody}>
        <Text>
          {data.openingSentence || ""} {data.narrativeDescription || ""} {data.closingSentence || ""}
        </Text>
      </View>

      <View style={styles.signatureBlock}>
        <Text>GIVEN UNDER MY HAND</Text>
        <Text>{data.date || "(date)"}</Text>
        <Text style={{ marginTop: 30 }}>{data.signatureBlock || "Commander Name, Rank"}</Text>
      </View>

      <View style={styles.specialOrderSection}>
        <Text>Special Order: {data.specialOrder || "(Special Order)"}</Text>
        <Text>Condition: {data.condition || "(Condition)"}</Text>
        <Text>PAS: {data.pas || "(PAS)"}</Text>
        <Text>RDP: {data.rdp || "(RDP)"}</Text>
      </View>
    </Page>
  </Document>
);

const DecModifier = () => {
  const [userDecData, setUserDecData] = useState({
    awardType: "Meritorious Service Medal",
    multiplier: 1,
    name: "",
    openingSentence: "",
    narrativeDescription: "",
    closingSentence: "",
    date: "",
    signatureBlock: "",
    specialOrder: "",
    condition: "",
    pas: "",
    rdp: "",
  });

  const [charCount, setCharCount] = useState(MAX_CHARACTERS);
  const [showImage, setShowImage] = useState(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const totalChars =
      userDecData.openingSentence.length +
      userDecData.narrativeDescription.length +
      userDecData.closingSentence.length -
      userDecData[name].length +
      value.length;

    if (totalChars <= MAX_CHARACTERS) {
      setUserDecData((prevData) => ({
        ...prevData,
        [name]: value
      }));
      setCharCount(MAX_CHARACTERS - totalChars);
    }
  };

  const handleAwardTypeChange = (event) => {
    setUserDecData((prevData) => ({
      ...prevData,
      awardType: event.target.value
    }));
  };

  useEffect(() => {
    console.log(userDecData);
  }, [userDecData]);

  return (
    <>
      <div className="af-container">
        <h2 className="af-heading">Citation Generator</h2>

        <PDFViewer style={{ width: '100%', height: '500px' }}>
          <MyDocument data={userDecData} showImage={showImage} />
        </PDFViewer>

        <form className="af-card">
          <div className="af-form-group">
            <label className="af-form-label" htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="af-input"
              placeholder="Enter Name"
              onChange={handleInputChange}
              value={userDecData.name}
            />
          </div>

          <div className="af-form-group">
            <label className="af-form-label" htmlFor="awardType">Award Type</label>
            <select
              name="awardType"
              id="awardType"
              className="af-select"
              onChange={handleAwardTypeChange}
              value={userDecData.awardType}
            >
              <option value="Meritorious Service Medal">Meritorious Service Medal (MSM)</option>
              <option value="Air Force Commendation Medal">Air Force Commendation Medal (AFCM)</option>
              <option value="Air Force Achievement Medal">Air Force Achievement Medal (AFAM)</option>
            </select>
          </div>

          <div className="af-form-group">
            <label className="af-form-label" htmlFor="multiplier">Multiplier</label>
            <input
              type="number"
              name="multiplier"
              id="multiplier"
              className="af-input"
              placeholder="Enter Multiplier"
              onChange={handleInputChange}
              value={userDecData.multiplier}
            />
          </div>

          <div className="af-form-group">
            <label className="af-form-label" htmlFor="openingSentence">Opening Sentence</label>
            <textarea
              name="openingSentence"
              id="openingSentence"
              className="af-textarea"
              placeholder="Enter Opening Sentence"
              onChange={handleInputChange}
              value={userDecData.openingSentence}
            />
          </div>

          <div className="af-form-group">
            <label className="af-form-label" htmlFor="narrativeDescription">Narrative Description</label>
            <textarea
              name="narrativeDescription"
              id="narrativeDescription"
              className="af-textarea"
              placeholder="Enter Narrative Description"
              onChange={handleInputChange}
              value={userDecData.narrativeDescription}
            />
          </div>

          <div className="af-form-group">
            <label className="af-form-label" htmlFor="closingSentence">Closing Sentence</label>
            <textarea
              name="closingSentence"
              id="closingSentence"
              className="af-textarea"
              placeholder="Enter Closing Sentence"
              onChange={handleInputChange}
              value={userDecData.closingSentence}
            />
          </div>

          <div className="af-form-group">
            <label className="af-form-label" htmlFor="date">Date</label>
            <input
              type="text"
              name="date"
              id="date"
              className="af-input"
              placeholder="Enter Date"
              onChange={handleInputChange}
              value={userDecData.date}
            />
          </div>

          <div className="af-form-group">
            <label className="af-form-label" htmlFor="signatureBlock">Signature Block</label>
            <textarea
              name="signatureBlock"
              id="signatureBlock"
              className="af-textarea"
              placeholder="Enter Signature Block"
              onChange={handleInputChange}
              value={userDecData.signatureBlock}
            />
          </div>

          <div className="af-form-group">
            <label className="af-form-label" htmlFor="specialOrder">Special Order</label>
            <input
              type="text"
              name="specialOrder"
              id="specialOrder"
              className="af-input"
              placeholder="Enter Special Order"
              onChange={handleInputChange}
              value={userDecData.specialOrder}
            />
          </div>

          <div className="af-form-group">
            <label className="af-form-label" htmlFor="condition">Condition</label>
            <input
              type="text"
              name="condition"
              id="condition"
              className="af-input"
              placeholder="Enter Condition"
              onChange={handleInputChange}
              value={userDecData.condition}
            />
          </div>

          <div className="af-form-group">
            <label className="af-form-label" htmlFor="pas">PAS</label>
            <input
              type="text"
              name="pas"
              id="pas"
              className="af-input"
              placeholder="Enter PAS"
              onChange={handleInputChange}
              value={userDecData.pas}
            />
          </div>

          <div className="af-form-group">
            <label className="af-form-label" htmlFor="rdp">RDP</label>
            <input
              type="text"
              name="rdp"
              id="rdp"
              className="af-input"
              placeholder="Enter RDP"
              onChange={handleInputChange}
              value={userDecData.rdp}
            />
          </div>

          <div className={styles.characterCounter}>
            <Text>{charCount} characters remaining</Text>
          </div>

          <PDFDownloadLink
            document={<MyDocument data={userDecData} showImage={showImage} />}
            fileName="citation.pdf"
            className="af-button"
          >
            {({ loading }) => (loading ? 'Loading document...' : 'Download now!')}
          </PDFDownloadLink>
        </form>
      </div>
    </>
  );
};

export default DecModifier;
