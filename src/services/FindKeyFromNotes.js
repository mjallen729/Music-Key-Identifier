import fs from 'fs'

// Key signature data from the JSON file
const keySigs = JSON.parse(fs.readFileSync('./data/keySigs.json', 'utf8'));

// Circle of Fifths (Major and Minor)
const circleOfFifths = [
  "C", "G", "D", "A", "E", "B", "F# Gb", "Db C#", "Ab G#", "Eb D#", "Bb A#", "F"
];
const minorCircleOfFifths = [
  "Am", "Em", "Bm", "F#m Gbm", "C#m Dbm", "G#m Abm", "D#m Ebm", "A#m Bbm", "Fm", "Cm", "Gm", "Dm"
];

export default class FindKeyFromNotes {

  // Calculate the distance between two keys on the circle of fifths
  calculateDistance(key1, key2) {
    const majorIndex1 = circleOfFifths.findIndex(k => k.includes(key1));
    const majorIndex2 = circleOfFifths.findIndex(k => k.includes(key2));
    const minorIndex1 = minorCircleOfFifths.findIndex(k => k.includes(key1));
    const minorIndex2 = minorCircleOfFifths.findIndex(k => k.includes(key2));

    if (majorIndex1 !== -1 && majorIndex2 !== -1) {
      return Math.abs(majorIndex1 - majorIndex2);

    } else if (minorIndex1 !== -1 && minorIndex2 !== -1) {
      return Math.abs(minorIndex1 - minorIndex2);

    } else {
      return Infinity;

    }
  }

  // Find keys that contain all notes and rank by closest musical adjacency (based on the circle of fifths)
  rankKeysByAdjacency(noteList) {
    const tonic = noteList[0]; // Assume the first note is the tonic
    const noteSet = new Set(noteList);
    const keyMatches = [];

    for (const key in keySigs) {
      const keyNotes = keySigs[key].flatMap(note => note.split(" "));
      let allNotesExist = true;

      noteSet.forEach(note => {
        if (!keyNotes.includes(note)) {
          allNotesExist = false;

        }

      });

      if (allNotesExist) {
        // Calculate the distance from the tonic (circle of fifths)
        const distance = calculateDistance(tonic, key);
        keyMatches.push({ key, distance });

      }
    }

    // Sort keys by their distance from the tonic (ascending)
    keyMatches.sort((a, b) => a.distance - b.distance);
    return keyMatches.map(match => match.key);

  }

  run(notes) {
    rankedKeys = rankKeysByAdjacency(notes);

    console.log("Ranked keys by closest adjacency (circle of fifths):", rankedKeys);
  }
  
  // notes = ['C', 'A', 'E', 'F', 'G', 'B', 'D'];

}

