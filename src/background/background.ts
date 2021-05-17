// TODO: background script
chrome.runtime.onInstalled.addListener(() => {
  // TODO: on installed function
  console.log('background on installed.')

  chrome.contextMenus.create({
    contexts: ['selection'],
    title: 'Cari arti',
    id: 'artiinExtension',
  })

  chrome.contextMenus.onClicked.addListener((event) => {
    console.log(event.selectionText)
  })
})
