import { NextRequest, NextResponse } from 'next/server'
import { createWorker } from 'tesseract.js'
import { SUPPORTED_LANGUAGES } from '../../types/sopported-languages'

interface ImageToText {
  language?: keyof typeof SUPPORTED_LANGUAGES
  image: string
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const request: ImageToText = await req.json()

    const worker = await createWorker(
      request.language ? SUPPORTED_LANGUAGES[request.language] : 'eng',
      1,
      {
        workerPath:
          './node_modules/tesseract.js/src/worker-script/node/index.js',
      },
    )
    const recognize = await worker.recognize(request.image)



    return NextResponse.json({ text: recognize?.data.text })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error' }, { status: 500 })
  }
}
