import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'COLUMN',
    backgroundColor: '#E4E4E4'
  },
  section: {
    textAlign: 'center', margin: 30 ,
    padding: 10,
    flexGrow: 1
  }
});

const inchCmConverter = (inch) => { return inch * 2.54 }
// Create Document Component
const MyDocument = ({test}) => (
  <Document>
    <Page size="A4" style={styles.page} debug={true}>
      <View style={styles.section}>
        <Text>test</Text>
      </View>
      <View style={styles.section}>
        <Text># of cytations</Text>
      </View>
      
      <View style={styles.section}>
        <Text>name</Text>
      </View>
      
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
      <View style={styles.section}>

      </View>
    </Page>
  </Document>
);

export default MyDocument