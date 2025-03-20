const form = document.forms.fileUpload
form.addEventListener('submit', onSubmit)

const dragArea = document.querySelector('.drag-area')
const dragText = document.querySelector('.header')
const input = form.querySelector('[type=file]')
const filesLength = form.querySelector('.files-length')
const reserBtn = form.querySelector('[type="reset"]')

let dropedFiles

dragArea.addEventListener('dragover', (e) => {
    dragText.textContent = 'Release to Upload'
    dragArea.classList.add('active')
})

dragArea.addEventListener('dragleave', (e) => {
    dragText.textContent = 'Drag & Drop'
    dragArea.classList.remove('active')
})

dragArea.addEventListener('drop', (e) => {
    dragArea.classList.remove('error')
    dropedFiles = e.dataTransfer.files
    filesLength.textContent = `${dropedFiles.length} file(s) chosen`
    input.files = e.dataTransfer.files

})

input.addEventListener('change', (e) => {
    dragArea.classList.remove('error')
    filesLength.textContent = `${e.target.files.length} file(s) chosen`
    dragArea.classList.add('active')

})

reserBtn.addEventListener('click', () => {
    filesLength.textContent = ``
    dragArea.classList.remove('active')
})


async function onSubmit(e) {
    e.preventDefault()

    try {
        const files = e.target.fileInput.files

        if (files.length < 1) {
            filesLength.textContent = `Please select one or more files`;
            dragArea.classList.add('error')
            return
        }

        Array.from(files).forEach(async (file) => {
            const resp = await fetch('/uploading', {
                method: 'POST',
                headers: { 'file-name': file.name },
                body: file
            })

            console.log(resp.ok, await resp.text())
        })

        filesLength.textContent = ``
        dragArea.classList.remove('active')

    } catch (error) {

    }




}
