import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import { PDFViewer, PDFDownloadLink,Text, View, Document, StyleSheet, usePDF } from '@react-pdf/renderer';

import { Page,  } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'COLUMN',
    backgroundColor: '#E4E4E4'
  },
  section: {
    textAlign: 'center', margin: 30,
    padding: 10,
    flexGrow: 1
  }
});

const inchCmConverter = (inch) => { return inch * 2.54 }
// Create Document Component



const DecModifier = () => {
  const [test, settest] = usePDF('ffds');





  let MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>``</Text>
        </View>
        
        <View style={styles.section}>
          <Text># of cytations</Text>
        </View>
      </Page>
    </Document>
  );




  return (
    <>
      <PDFViewer>
        <MyDocument />
      </PDFViewer>


      <input className='form' onChange={settest} />


      <PDFDownloadLink
        document={<MyDocument />} fileName="somename.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Download now!'
        }
      </PDFDownloadLink>
    </>
  )
};

export default DecModifier