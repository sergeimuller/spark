import { useEffect, useRef, useState } from 'react'
import {
    Editor,
    EditorState,
    RichUtils,
    convertToRaw,
  } from 'draft-js'
import {ToolBar} from './toolbar'
import { Box } from "@chakra-ui/react"

// Custom overrides for each style
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 14,
        padding: 5,
    },
    BOLD: {
        fontWeight: 'bold',
    },
    'heading-one': {
        fontSize: 16,
        fontWeight: 'bold'
    },
    'heading-two': {
        fontSize: 14,
        fontWeight: 'bold'
    },
    'heading-three': {
        fontSize: 12,
        fontWeight: 'bold'
    },
    'heading-four': {
        fontSize: 10,
        fontWeight: 'bold'
    },
}

export default function RichEditor() {
    const editor = useRef()
    const elem = useRef()
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [showToolbar, setShowToolbar] = useState(false)
    const [windowWidth, setWindowWidth] = useState(0)
    const [toolbarMeasures, setToolbarMeasures] = useState({ w: 0, h: 0 })
    const [selectionMeasures, setSelectionMeasures] = useState({ w: 0, h: 0 })
    const [selectionCoordinates, setSelectionCoordinates] = useState({ x: 0, y: 0 })
    const [toolbarCoordinates, setToolbarCoordinates] = useState({ x: 0, y: 0 })
    const [showRawData, setShowRawData] = useState(false)

    function focusEditor() {
        editor.current.focus()
    }

    function onChange(editorState) {
        setEditorState(editorState)
    }

    function onClickEditor() {
      focusEditor()
      checkSelectedText()
    }

    function checkSelectedText() {
        if (typeof window !== 'undefined') {
            const text = window.getSelection().toString()
            if (text !== '') {
                // 1-a Define the selection coordinates
                setSelectionXY()
            } else {
                // Hide the toolbar if nothing is selected
                setShowToolbar(false)
            }
        }
    }

    function setSelectionXY() {
        const selectionArea = window.getSelection().getRangeAt(0).getBoundingClientRect()
        const relativeArea = document.body.parentNode.getBoundingClientRect()
        setSelectionCoordinates(selectionArea)
        setWindowWidth(relativeArea.width)
        setSelectionMeasures({
          w: relativeArea.width,
          h: relativeArea.height,
        })
    }

    useEffect(() => {
        setShowToolbar(true)
    }, [selectionMeasures])

    useEffect(() => {
        setToolbarMeasures({
            w: elem.current.clientWidth,
            h: elem.current.clientHeight,
        })
    }, [showToolbar])

    useEffect(() => {
        setToolbarXY()
    }, [toolbarMeasures])

    function setToolbarXY() {

        const hiddenTop = selectionCoordinates.y < toolbarMeasures.h
        const hiddenRight = windowWidth - selectionCoordinates.x < toolbarMeasures.w / 2
        const hiddenLeft = selectionCoordinates.x < toolbarMeasures.w / 2

        const normalX = selectionCoordinates.x - toolbarMeasures.w / 2 + selectionMeasures.w / 2
        const normalY = selectionCoordinates.y - toolbarMeasures.h

        const invertedY = selectionCoordinates.y + selectionMeasures.h
        const moveXToLeft = windowWidth - toolbarMeasures.w
        const moveXToRight = 0

        const coordinates = {
            x: normalX,
            y: normalY,
        }

        if (hiddenTop) {
            coordinates.y = invertedY
        }

        if (hiddenRight) {
            coordinates.x = moveXToLeft
        }

        if (hiddenLeft) {
            coordinates.x = moveXToRight
        }

        setToolbarCoordinates(coordinates)
    }

    function handleKeyCommand(command) {
        const newState = RichUtils.handleKeyCommand(editorState, command)
        if (newState) {
            onChange(newState)
            return true
        }
        return false
    }

    function toggleToolbar(inlineStyle) {
        onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle))
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkSelectedText)
    }

    function blockStyleFn(contentBlock) {
        const type = contentBlock.getType();
        if (type === 'blockquote') {
          return {
            color: '#999',
            fontFamily: `'Hoefler Text', Georgia, serif`,
            fontStyle: 'italic',
            textAlign: 'center',
          };
        }
      }

    return (
        <Box my={5} borderRadius="md" border="1px" borderColor="gray.200">
        <ToolBar 
            elemRef={elem} 
            editorState={editorState} 
            onToggle={toggleToolbar} 
            toolbarCoordinates={toolbarCoordinates} 
            showToolbar={showToolbar}
        />
        <div onClick={onClickEditor} onBlur={checkSelectedText} style={{padding: 10}}>
          <Editor
            blockStyleFn={blockStyleFn}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            onChange={onChange}
            editorKey="foobar"
            placeholder="Start writing..."
            spellCheck={false}
            ref={editor}
          />
        </div>
        <div style={{ marginTop: 40,padding: 10 }}>
          <button
            onClick={() =>
              setShowRawData(!showRawData)
            }
          >
            {!showRawData ? 'Show' : 'Hide'} Raw Data
          </button>
          <br />
          {showRawData &&
            JSON.stringify(convertToRaw(editorState.getCurrentContent()))}
        </div>
      </Box>
    )
}
