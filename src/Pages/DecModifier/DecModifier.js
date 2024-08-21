import React, { useEffect, useState } from "react";
import { PDFViewer, PDFDownloadLink, Text, View, Document, StyleSheet, Page, Image, Font } from '@react-pdf/renderer';
import MSM_Image from './Images/MSM_Image.png'
import AFCM_Image from './Images/AFCM_Image.png'
import AFAM_Image from './Images/AFAM_Image.png'
import Times_New_Roman from './Font/Times_New_Roman.ttf'
import Times_New_Roman_Bold from './Font/Times_New_Roman_Bold.ttf'
// Register font
Font.register({ family: 'Times_New_Roman', src: Times_New_Roman });
Font.register({ family: 'Times_New_Roman_Bold', src: Times_New_Roman_Bold });

// Maximum characters allowed
const MAX_CHARACTERS = 1350;

// Award images
const awardImages = {
  "Meritorious Service Medal": MSM_Image,
  "Air Force Commendation Medal": AFCM_Image,
  "Air Force Achievement Medal": AFAM_Image
};

// Create styles for the PDF document
const styles = StyleSheet.create({
  page: {
    fontSize: 12,
    fontFamily: 'Times_New_Roman',
    flexDirection: 'column',
    paddingLeft: '96',
    paddingRight: '96',
    textAlign: 'center',

  },
  image: {
    height: 150,
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'center'
  },
  citationDepartment: {
    textAlign: 'center',
    fontFamily: 'Times_New_Roman_Bold',
    fontSize: 21.5,
    textTransform: 'uppercase',
    paddingBottom: 24,

  },
  certifyLine: {
    fontSize: 12,
    textTransform: 'uppercase',
    paddingBottom: 12,
  },
  certifyType: {
    fontSize: 16,
    fontFamily: 'Times_New_Roman_Bold',
    textTransform: 'uppercase',
    paddingBottom: 12,
  },
  awardToLine: {
    fontSize: 13,
    textTransform: 'uppercase',
    paddingBottom: 20,
  },
  awardToName: {
    fontSize: 12,
    textTransform: 'uppercase',
    paddingBottom: 20,
  },

  forLine: {
    fontSize: 13.5,
    textTransform: 'uppercase',
    paddingBottom: 12,
  },
  awardName: {
    fontSize: 12,
    textTransform: 'uppercase',
    paddingBottom: 24,
  },
  awardReason: {
    fontSize: 12,
    textTransform: 'uppercase',
    paddingBottom: 20,
  },
  accomplishmentsLine: {
    fontSize: 13,
    textTransform: 'uppercase',
    paddingBottom: 12,
  },
  citationBody: {
    fontSize: 12,
    textAlign: 'justify',
    paddingBottom: 24,
  },
  givenUnderMyHand: {
    fontSize: 10.5,
    textAlign: 'center',
    paddingBottom: 12,
  },
  dateBlock: {
    fontSize: 10.5,
    textAlign: 'center',
    paddingBottom: 24,
  },
  signatureBlock: {
    marginTop: 0,
    textAlign: 'left',
  },
  specialOrderSection: {
    fontSize: 7,
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'space-evenly',
    bottom: 10,
    position: 'absolute'
  },
  specialOrderItem: {
    marginBottom: 5,
  }
});

// Utility function to determine the oak leaf clusters based on multiplier
const getOakLeafClusters = (multiplier) => {
  if (multiplier === 0) return '';

  const silverClusters = Math.floor(multiplier / 6);
  const bronzeClusters = multiplier % 6;

  const silverText = silverClusters > 0 ? `First Silver Oak Leaf Cluster` : '';
  const bronzeText = bronzeClusters > 0 ? `${bronzeClusters === 1 ? 'First' : bronzeClusters === 2 ? 'Second' : bronzeClusters === 3 ? 'Third' : bronzeClusters === 4 ? 'Fourth' : 'Fifth'} Bronze Oak Leaf Cluster` : '';

  if (silverClusters > 0 && bronzeClusters > 0) {
    return `${silverText} and ${bronzeText}`;
  }
  return silverText || bronzeText;
};

// Create Document Component
const MyDocument = ({ data, showImage }) => (
  <Document>
    <Page size="LETTER" style={styles.page}>
      {showImage && awardImages[data.awardType] && (
        <View style={styles.section}>
          <Image style={styles.image} src={awardImages[data.awardType]} />
        </View>
      )}

      <View style={styles.citationDepartment}>
        <Text>DEPARTMENT OF THE AIR FORCE</Text>

      </View>

      <View style={styles.certifyLine}>
        <Text>THIS IS TO CERTIFY THAT</Text>
      </View>
      <View style={styles.certifyType}>
        <Text>THE {data.awardType}</Text>
        {data.multiplier > 0 && (
          <Text>({getOakLeafClusters(data.multiplier)})</Text>
        )}
      </View>

      <View style={styles.awardToLine}>
        <Text>HAS BEEN AWARDED TO</Text>
      </View>



      <View style={styles.awardToName}>
        <Text>{data.name || "FIRSTNAME M. LASTNAME"}</Text>
      </View>


      <View style={styles.forLine}>
        <Text>FOR</Text>
      </View>

      <View style={styles.awardReason}>
        <Text>{data.forStatement || "MERITORIOUS SERVICE"}</Text>
      </View>

      <View style={styles.accomplishmentsLine}>
        <Text>ACCOMPLISHMENTS</Text>
      </View>

      <View style={styles.citationBody}>
        <Text>
          {data.openingSentence || ""} {data.narrativeDescription || ""} {data.closingSentence || ""}
        </Text>
      </View>


      <View style={styles.givenUnderMyHand}>
        <Text>GIVEN UNDER MY HAND</Text>
      </View>

      <View style={styles.dateBlock}>
        <Text>{data.date || "(date)"}</Text>
      </View>

      <View style={styles.givenUnderMyHand}>
        <Text>_______________________________________</Text>
      </View>


      <View style={styles.signatureBlock}>
        <Text>{data.date || "(date)"}</Text>
        <Text>{data.signatureBlock || "Commander Name, Rank"}</Text>
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
    awardType: "",
    multiplier: null,
    name: "",
    forStatement: "",
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

  // Separate handlers for fields that should affect the character count
  const handleTextChange = (event) => {
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

  // Separate handler for other fields that don't affect the character count
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDecData((prevData) => ({
      ...prevData,
      [name]: value
    }));
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
            <label className="af-form-label" htmlFor="forStatement">For Statement</label>
            <textarea
              type="number"
              name="forStatement"
              id="forStatement"
              className="af-input"
              placeholder="Enter For Statement"
              onChange={handleInputChange}
              value={userDecData.forStatement}
            />
          </div>


          <div className={styles.characterCounter}>
            <label className="af-form-label">Remaining Characters:</label>
            <span style={{ color: charCount < 100 ? 'red' : 'black' }}>
              {charCount}
            </span>
          </div>

          <div className="af-form-group">
            <label className="af-form-label" htmlFor="openingSentence">Opening Sentence</label>
            <textarea
              name="openingSentence"
              id="openingSentence"
              className="af-textarea"
              placeholder="Enter Opening Sentence"
              onChange={handleTextChange}
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
              onChange={handleTextChange}
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
              onChange={handleTextChange}
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
