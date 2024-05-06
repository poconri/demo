'use client'

import { Http } from '@/app/providers/https'
import { SimpleLayout } from '@/components/SimpleLayout'
import { AnimatedDiv } from '@/components/animated-div/animated-div'
import React, { useCallback, useState } from 'react'
import Dropzone from 'react-dropzone'

export default function ImageToText() {
  const [file, setFile] = useState<File | null>(null)
  const [isFileHovered, setIsFileHovered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [text, setText] = useState<string | null>('')
  const [isRemovingText, setIsRemovingText] = useState(false)
  const [isRemovingFile, setIsRemovingFile] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0])
  }, [])

  const getBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })

  const handleUploadFile = async () => {
    setIsLoading(true)
    const https = new Http()

    try {
      const base64 = file ? await getBase64(file) : ''

      const response = await https.post<{ text: string }, { image: string }>(
        '/api/image-to-text',
        (data): data is { text: string } =>
          typeof data === 'object' && data !== null && 'text' in data,
        { image: base64 },
      )
      setFile(null)
      setText(response.data?.text ?? '')
    } catch (error) {
      console.log(JSON.stringify(error))
    } finally {
      setIsLoading(false)
    }
  }

  const handleMouseEnter = () => setIsFileHovered(true)

  const handleMouseLeave = () => setIsFileHovered(false)

  return (
    <AnimatedDiv>
      <SimpleLayout
        title="Converts images to text using the latest in AI technology."
        intro="
	 			Image to Text is a tool that uses the latest in AI technology to convert images to text. 
		This tool is perfect for extracting text from images, such as screenshots or photos of documents. 
		It supports multiple languages and can be used for a variety of purposes, such as transcribing handwritten notes or extracting text from images for use in other applications.

	  "
      >
        <Dropzone
          onDrop={onDrop}
          disabled={!!file || !!text}
          multiple={false}
          accept={{
            'image/jpeg': [],
            'image/png': [],
            'image/webp': [],
            'image/tiff': [],
            'image/avif': [],
            'image/bmp': [],
            'image/vnd.microsoft.icon': [],
            'application/pdf': [],
            'image/svg+xml': [],
          }}
        >
          {({ getRootProps, getInputProps }) => {
            const { onClick, ...rootProps } = getRootProps()

            return (
              <section
                className={`flex min-h-96 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-10 transition-colors duration-200 hover:border-gray-400 ${
                  isLoading
                    ? 'hover:cursor-not-allowed'
                    : 'hover:cursor-pointer'
                }`}
                {...rootProps}
                onClick={onClick}
              >
                <div>
                  <input {...getInputProps()} />
                  {file && (
                    <AnimatedDiv>
                      <div
                        className={`flex gap-4 transition-opacity duration-500 ${
                          isRemovingFile ? 'opacity-0' : 'opacity-100'
                        }`}
                      >
                        <div
                          className={`flex items-center justify-between gap-4 rounded-lg border border-gray-300 p-4 transition-colors duration-200 hover:border-gray-400 ${
                            isLoading
                              ? 'hover:cursor-not-allowed'
                              : 'hover:cursor-pointer'
                          }`}
                          style={{
                            backgroundColor:
                              isFileHovered && !isLoading
                                ? 'green'
                                : 'transparent',
                          }}
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                          onClick={(event) => {
                            event.stopPropagation()
                            if (!isLoading) {
                              handleUploadFile()
                            }
                          }}
                        >
                          {isLoading && (
                            <span className="border-primary inline-block h-6 w-6 animate-spin rounded-full border-t-4"></span>
                          )}
                          {`Upload ${file.name}`}
                        </div>
                        <div
                          className={`flex items-center justify-between gap-4 rounded-lg border border-gray-300 p-4 transition-colors duration-200 hover:border-gray-400 hover:bg-red-500 ${
                            isLoading
                              ? 'hover:cursor-not-allowed'
                              : 'hover:cursor-pointer'
                          }`}
                          onClick={(event) => {
                            event.stopPropagation()
                            if (!isLoading) {
                              setIsRemovingFile(true)
                              setTimeout(() => {
                                setFile(null)
                                setIsRemovingFile(false)
                              }, 500)
                            }
                          }}
                        >
                          Remove
                        </div>
                      </div>
                    </AnimatedDiv>
                  )}
                  {!file && !text && (
                    <AnimatedDiv>
                      <p>{`Drag 'n' drop a image or PDF here, or click to select files`}</p>
                    </AnimatedDiv>
                  )}
                  {text && (
                    <div
                      className={`flex h-full w-full cursor-text flex-col items-center justify-center gap-8 transition-opacity duration-500 ${
                        isRemovingText ? 'opacity-0' : 'opacity-100'
                      }`}
                    >
                      <p className="text-lg font-bold">
                        Text extracted from the image:
                      </p>
                      <div className="cursor-text rounded-lg bg-gray-300 p-8 text-lg font-bold text-gray-800">
                        {text}
                      </div>
                      <div className="flex w-full items-center justify-center gap-4">
                        <a
                          href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                            text,
                          )}`}
                          download="text.txt"
                        />
                        <div className="rounded-lg border border-gray-300 p-4 transition-colors duration-200 ease-in-out hover:cursor-pointer hover:border-gray-400">
                          Download
                        </div>
                        <div
                          className="rounded-lg border border-gray-300 p-4 transition-colors duration-200 ease-in-out hover:cursor-pointer hover:border-gray-400"
                          onClick={() => {
                            setIsRemovingText(true)
                            setTimeout(() => {
                              setText(null)
                              setIsRemovingText(false)
                            }, 500)
                          }}
                        >
                          Reset
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )
          }}
        </Dropzone>
      </SimpleLayout>
    </AnimatedDiv>
  )
}
