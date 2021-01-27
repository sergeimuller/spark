import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeading, faBold, faItalic, faUnderline, faCode, faListUl, faListOl, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import {
    Button,
    Menu,
    MenuButton,
    MenuOptionGroup,
    MenuItemOption,
    MenuList
  } from "@chakra-ui/react"
export function ToolBar({
    editorState, 
    onToggle, 
    elemRef, 
    toolbarCoordinates,
    showToolbar,
}) { 
    const toolbarStyle = {
        padding: 5,
        borderBottom: '1px solid #E2E5E7',
    }
    const toolbarItems = [
        { icon: faHeading, style: 'HEADING'},
        { icon: faBold, style: 'BOLD' },
        { icon: faItalic, style: 'ITALIC' },
        { icon: faUnderline, style: 'UNDERLINE' },
        { icon: faCode, style: 'CODE' },
        { icon: faQuoteLeft, style: 'blockquote'},
        { icon: faListUl, style: 'unordered-list-item'},
        { icon: faListOl, style: 'ordered-list-item'}
    ]
    const currentStyle = editorState.getCurrentInlineStyle()
    
    return (
        <div
        ref={elemRef}
        style={toolbarStyle}>
            {toolbarItems.map((toolbarItem, index) => (
                <ToolbarButton
                    key={`${toolbarItem.style}-${index}`}
                    active={currentStyle.has(toolbarItem.style)}
                    editorStyle={currentStyle}
                    icon={toolbarItem.icon}
                    onToggle={onToggle}
                    style={toolbarItem.style}
                />
            ))}
        </div>
    )
}

function ToolbarButton({
    onToggle,
    editorStyle,
    style,
    icon,
    active
}) {
    function handleToggle(event) {
        event.preventDefault()
        onToggle(style)
    }

    const buttonStyle = {
        padding: 10,
        cursor: 'pointer',
        backgroundColor: active ? '#9A8AEB' : ''
    }

    if (style === 'HEADING') {
        const headingIsActive = [
            'header-one',
            'header-two',
            'header-three',
            'header-four',
        ].some((headingStyle) => editorStyle.has(headingStyle))

        return (
            <Menu p={0} m={0}>
                <MenuButton as={Button} p={0} mx={1} size="sm" style={{backgroundColor: headingIsActive ? '#9A8AEB' : ''}}>
                    <FontAwesomeIcon icon={faHeading} color={headingIsActive ? 'white' : 'black'} />
                </MenuButton>
                <MenuList>
                    <MenuOptionGroup onChange={onToggle} defaultValue={style} type="radio">
                        <MenuItemOption value='header-one'>H1</MenuItemOption>
                        <MenuItemOption value='header-two'>H2</MenuItemOption>
                        <MenuItemOption value='header-three'>H3</MenuItemOption>
                        <MenuItemOption value='header-four'>H4</MenuItemOption>
                    </MenuOptionGroup>
                </MenuList>
            </Menu>
        )
    }
    return (
        <Button size="sm" mx={1} onClick={handleToggle} style={buttonStyle}>
            <FontAwesomeIcon icon={icon} color={active ? 'white' : 'black'} />
        </Button>
    )
}

