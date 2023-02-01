const { Client } = require('@notionhq/client')

const notion = new Client({ auth: process.env.NOTION_API_KEY })

async function getTestNameAndCoverage() {
    const stepName = await notion.pages.properties.retrieve({ 
        page_id: process.env.NOTION_TESTS_PAGE_ID, property_id: "Name",
        filter: {
            and: [
              {
                property: process.env.NOTION_SCREENS_TITLE_ID,
                rich_text: {
                  equals: "2421152",
                },
              },
            ],
          }          
    })
    const stepCoverage = await notion.pages.properties.retrieve({ 
        page_id: process.env.NOTION_TESTS_PAGE_ID, property_id: "Environment",
        filter: {
            and: [
              {
                property: process.env.NOTION_SCREENS_TITLE_ID,
                rich_text: {
                  equals: "2421152",
                },
              },
            ],
          }          
    })
    var coverage = ""
    for (const [key, value] of Object.entries(stepCoverage.multi_select)) {
        coverage += " " + `${value.name}`
      }
    console.log(stepName.results[0].rich_text.text.content + ". Coverage:" + coverage)
}

getTestNameAndCoverage()