const word = process.argv[2];
if (!word) {
  console.error("Please provide a word!");
  process.exit(1);
}

async function getDefinition(reqword: string) {
  try {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${reqword}`;
    const requiredData = await fetch(url);
    const data = await requiredData.json();
    // console.log(jsonData);
    // const firstMeaning = data[0].meanings?.[0];
    const firstMeaning = data[0].meanings.find(
      (m: any) => m.synonyms && m.synonyms.length > 0
    );
    return {
      definition: firstMeaning.definitions?.[0]?.definition,
      partofspeech: firstMeaning.partOfSpeech,
      synonym: firstMeaning.synonyms?.[0] ?? "No synonym found",
      antonym: firstMeaning.antonyms?.[0] ?? "No antonym found",
    };
  } catch (error: unknown) {
    if (error instanceof Error)
      console.log("An error occured. ", error.message);
    else console.log("An unknown error occured.");
    return null;
  }
}
async function fetchData(word: string) {
  const result = await getDefinition(word);
  if (!result) {
    console.log("No data found!");
    return;
  }
  const { definition, partofspeech, synonym, antonym } = result;
  console.log(`
---- ${word.toUpperCase()} ----
Definition     : ${definition}
Part of Speech : ${partofspeech}
Synonym        : ${synonym}
Antonym        : ${antonym}
--------------------------
`);
}
fetchData(word);
