// Author: Daan van den Bergh
// Copyright: © 2022 Daan van den Bergh.

#include "/Volumes/persistance/private/vinc/vlib/include/vlib/vlib.h"

int main() {
	using namespace vlib::types::shortcuts;
	
	// Reference: https://www.w3schools.com/cssref/index.php
	String css_reference =
	"A" "\n"
	"accent-color 	Specifies an accent color for user-interface controls" "\n"
	"align-content 	Specifies the alignment between the lines inside a flexible container when the items do not use all available space" "\n"
	"align-items 	Specifies the alignment for items inside a flexible container" "\n"
	"align-self 	Specifies the alignment for selected items inside a flexible container" "\n"
	"all 	Resets all properties (except unicode-bidi and direction)" "\n"
	"animation 	A shorthand property for all the animation-* properties" "\n"
	"animation-delay 	Specifies a delay for the start of an animation" "\n"
	"animation-direction 	Specifies whether an animation should be played forwards, backwards or in alternate cycles" "\n"
	"animation-duration 	Specifies how long an animation should take to complete one cycle" "\n"
	"animation-fill-mode 	Specifies a style for the element when the animation is not playing (before it starts, after it ends, or both)" "\n"
	"animation-iteration-count 	Specifies the number of times an animation should be played" "\n"
	"animation-name 	Specifies a name for the @keyframes animation" "\n"
	"animation-play-state 	Specifies whether the animation is running or paused" "\n"
	"animation-timing-function 	Specifies the speed curve of an animation" "\n"
	"aspect-ratio 	Specifies preferred aspect ratio of an element" "\n"
	"B" "\n"
	"backdrop-filter 	Defines a graphical effect to the area behind an element" "\n"
	"backface-visibility 	Defines whether or not the back face of an element should be visible when facing the user" "\n"
	"background 	A shorthand property for all the background-* properties" "\n"
	"background-attachment 	Sets whether a background image scrolls with the rest of the page, or is fixed" "\n"
	"background-blend-mode 	Specifies the blending mode of each background layer (color/image)" "\n"
	"background-clip 	Defines how far the background (color or image) should extend within an element" "\n"
	"background-color 	Specifies the background color of an element" "\n"
	"background-image 	Specifies one or more background images for an element" "\n"
	"background-origin 	Specifies the origin position of a background image" "\n"
	"background-position 	Specifies the position of a background image" "\n"
	"background-position-x 	Specifies the position of a background image on x-axis" "\n"
	"background-position-y 	Specifies the position of a background image on y-axis" "\n"
	"background-repeat 	Sets if/how a background image will be repeated" "\n"
	"background-size 	Specifies the size of the background images" "\n"
	"block-size 	Specifies the size of an element in block direction" "\n"
	"border 	A shorthand property for border-width, border-style and border-color" "\n"
	"border-block 	A shorthand property for border-block-width, border-block-style and border-block-color" "\n"
	"border-block-color 	Sets the color of the borders at start and end in the block direction" "\n"
	"border-block-end-color 	Sets the color of the border at the end in the block direction" "\n"
	"border-block-end-style 	Sets the style of the border at the end in the block direction" "\n"
	"border-block-end-width 	Sets the width of the border at the end in the block direction" "\n"
	"border-block-start-color 	Sets the color of the border at the start in the block direction" "\n"
	"border-block-start-style 	Sets the style of the border at the start in the block direction" "\n"
	"border-block-start-width 	Sets the width of the border at the start in the block direction" "\n"
	"border-block-style 	Sets the style of the borders at start and end in the block direction" "\n"
	"border-block-width 	Sets the width of the borders at start and end in the block direction" "\n"
	"border-bottom 	A shorthand property for border-bottom-width, border-bottom-style and border-bottom-color" "\n"
	"border-bottom-color 	Sets the color of the bottom border" "\n"
	"border-bottom-left-radius 	Defines the radius of the border of the bottom-left corner" "\n"
	"border-bottom-right-radius 	Defines the radius of the border of the bottom-right corner" "\n"
	"border-bottom-style 	Sets the style of the bottom border" "\n"
	"border-bottom-width 	Sets the width of the bottom border" "\n"
	"border-collapse 	Sets whether table borders should collapse into a single border or be separated" "\n"
	"border-color 	Sets the color of the four borders" "\n"
	"border-image 	A shorthand property for all the border-image-* properties" "\n"
	"border-image-outset 	Specifies the amount by which the border image area extends beyond the border box" "\n"
	"border-image-repeat 	Specifies whether the border image should be repeated, rounded or stretched" "\n"
	"border-image-slice 	Specifies how to slice the border image" "\n"
	"border-image-source 	Specifies the path to the image to be used as a border" "\n"
	"border-image-width 	Specifies the width of the border image" "\n"
	"border-inline 	A shorthand property for border-inline-width, border-inline-style and border-inline-color" "\n"
	"border-inline-color 	Sets the color of the borders at start and end in the inline direction" "\n"
	"border-inline-end-color 	Sets the color of the border at the end in the inline direction" "\n"
	"border-inline-end-style 	Sets the style of the border at the end in the inline direction" "\n"
	"border-inline-end-width 	Sets the width of the border at the end in the inline direction" "\n"
	"border-inline-start-color 	Sets the color of the border at the start in the inline direction" "\n"
	"border-inline-start-style 	Sets the style of the border at the start in the inline direction" "\n"
	"border-inline-start-width 	Sets the width of the border at the start in the inline direction" "\n"
	"border-inline-style 	Sets the style of the borders at start and end in the inline direction" "\n"
	"border-inline-width 	Sets the width of the borders at start and end in the inline direction" "\n"
	"border-left 	A shorthand property for all the border-left-* properties" "\n"
	"border-left-color 	Sets the color of the left border" "\n"
	"border-left-style 	Sets the style of the left border" "\n"
	"border-left-width 	Sets the width of the left border" "\n"
	"border-radius 	A shorthand property for the four border-*-radius properties" "\n"
	"border-right 	A shorthand property for all the border-right-* properties" "\n"
	"border-right-color 	Sets the color of the right border" "\n"
	"border-right-style 	Sets the style of the right border" "\n"
	"border-right-width 	Sets the width of the right border" "\n"
	"border-spacing 	Sets the distance between the borders of adjacent cells" "\n"
	"border-style 	Sets the style of the four borders" "\n"
	"border-top 	A shorthand property for border-top-width, border-top-style and border-top-color" "\n"
	"border-top-color 	Sets the color of the top border" "\n"
	"border-top-left-radius 	Defines the radius of the border of the top-left corner" "\n"
	"border-top-right-radius 	Defines the radius of the border of the top-right corner" "\n"
	"border-top-style 	Sets the style of the top border" "\n"
	"border-top-width 	Sets the width of the top border" "\n"
	"border-width 	Sets the width of the four borders" "\n"
	"bottom 	Sets the elements position, from the bottom of its parent element" "\n"
	"box-decoration-break 	Sets the behavior of the background and border of an element at page-break, or, for in-line elements, at line-break." "\n"
	"box-reflect 	The box-reflect property is used to create a reflection of an element." "\n"
	"box-shadow 	Attaches one or more shadows to an element" "\n"
	"box-sizing 	Defines how the width and height of an element are calculated: should they include padding and borders, or not" "\n"
	"break-after 	Specifies whether or not a page-, column-, or region-break should occur after the specified element" "\n"
	"break-before 	Specifies whether or not a page-, column-, or region-break should occur before the specified element" "\n"
	"break-inside 	Specifies whether or not a page-, column-, or region-break should occur inside the specified element" "\n"
	"C" "\n"
	"caption-side 	Specifies the placement of a table caption" "\n"
	"caret-color 	Specifies the color of the cursor (caret) in inputs, textareas, or any element that is editable" "\n"
	"@charset 	Specifies the character encoding used in the style sheet" "\n"
	"clear 	Specifies what should happen with the element that is next to a floating element" "\n"
	"clip 	Clips an absolutely positioned element" "\n"
	"color 	Sets the color of text" "\n"
	"column-count 	Specifies the number of columns an element should be divided into" "\n"
	"column-fill 	Specifies how to fill columns, balanced or not" "\n"
	"column-gap 	Specifies the gap between the columns" "\n"
	"column-rule 	A shorthand property for all the column-rule-* properties" "\n"
	"column-rule-color 	Specifies the color of the rule between columns" "\n"
	"column-rule-style 	Specifies the style of the rule between columns" "\n"
	"column-rule-width 	Specifies the width of the rule between columns" "\n"
	"column-span 	Specifies how many columns an element should span across" "\n"
	"column-width 	Specifies the column width" "\n"
	"columns 	A shorthand property for column-width and column-count" "\n"
	"content 	Used with the :before and :after pseudo-elements, to insert generated content" "\n"
	"counter-increment 	Increases or decreases the value of one or more CSS counters" "\n"
	"counter-reset 	Creates or resets one or more CSS counters" "\n"
	"cursor 	Specifies the mouse cursor to be displayed when pointing over an element" "\n"
	"D" "\n"
	"direction 	Specifies the text direction/writing direction" "\n"
	"display 	Specifies how a certain HTML element should be displayed" "\n"
	"E" "\n"
	"empty-cells 	Specifies whether or not to display borders and background on empty cells in a table" "\n"
	"F" "\n"
	"filter 	Defines effects (e.g. blurring or color shifting) on an element before the element is displayed" "\n"
	"flex 	A shorthand property for the flex-grow, flex-shrink, and the flex-basis properties" "\n"
	"flex-basis 	Specifies the initial length of a flexible item" "\n"
	"flex-direction 	Specifies the direction of the flexible items" "\n"
	"flex-flow 	A shorthand property for the flex-direction and the flex-wrap properties" "\n"
	"flex-grow 	Specifies how much the item will grow relative to the rest" "\n"
	"flex-shrink 	Specifies how the item will shrink relative to the rest" "\n"
	"flex-wrap 	Specifies whether the flexible items should wrap or not" "\n"
	"float 	Specifies whether an element should float to the left, right, or not at all" "\n"
	"font 	A shorthand property for the font-style, font-variant, font-weight, font-size/line-height, and the font-family properties" "\n"
	"@font-face 	A rule that allows websites to download and use fonts other than the \"web-safe\" fonts" "\n"
	"font-family 	Specifies the font family for text" "\n"
	"font-feature-settings 	Allows control over advanced typographic features in OpenType fonts" "\n"
	"@font-feature-values 	Allows authors to use a common name in font-variant-alternate for feature activated differently in OpenType" "\n"
	"font-kerning 	Controls the usage of the kerning information (how letters are spaced)" "\n"
	"font-language-override 	Controls the usage of language-specific glyphs in a typeface" "\n"
	"font-size 	Specifies the font size of text" "\n"
	"font-size-adjust 	Preserves the readability of text when font fallback occurs" "\n"
	"font-stretch 	Selects a normal, condensed, or expanded face from a font family" "\n"
	"font-style 	Specifies the font style for text" "\n"
	"font-synthesis 	Controls which missing typefaces (bold or italic) may be synthesized by the browser" "\n"
	"font-variant 	Specifies whether or not a text should be displayed in a small-caps font" "\n"
	"font-variant-alternates 	Controls the usage of alternate glyphs associated to alternative names defined in @font-feature-values" "\n"
	"font-variant-caps 	Controls the usage of alternate glyphs for capital letters" "\n"
	"font-variant-east-asian 	Controls the usage of alternate glyphs for East Asian scripts (e.g Japanese and Chinese)" "\n"
	"font-variant-ligatures 	Controls which ligatures and contextual forms are used in textual content of the elements it applies to" "\n"
	"font-variant-numeric 	Controls the usage of alternate glyphs for numbers, fractions, and ordinal markers" "\n"
	"font-variant-position 	Controls the usage of alternate glyphs of smaller size positioned as superscript or subscript regarding the baseline of the font" "\n"
	"font-weight 	Specifies the weight of a font" "\n"
	"G" "\n"
	"gap 	A shorthand property for the row-gap and the column-gap properties" "\n"
	"grid 	A shorthand property for the grid-template-rows, grid-template-columns, grid-template-areas, grid-auto-rows, grid-auto-columns, and the grid-auto-flow properties" "\n"
	"grid-area 	Either specifies a name for the grid item, or this property is a shorthand property for the grid-row-start, grid-column-start, grid-row-end, and grid-column-end properties" "\n"
	"grid-auto-columns 	Specifies a default column size" "\n"
	"grid-auto-flow 	Specifies how auto-placed items are inserted in the grid" "\n"
	"grid-auto-rows 	Specifies a default row size" "\n"
	"grid-column 	A shorthand property for the grid-column-start and the grid-column-end properties" "\n"
	"grid-column-end 	Specifies where to end the grid item" "\n"
	"grid-column-gap 	Specifies the size of the gap between columns" "\n"
	"grid-column-start 	Specifies where to start the grid item" "\n"
	"grid-gap 	A shorthand property for the grid-row-gap and grid-column-gap properties" "\n"
	"grid-row 	A shorthand property for the grid-row-start and the grid-row-end properties" "\n"
	"grid-row-end 	Specifies where to end the grid item" "\n"
	"grid-row-gap 	Specifies the size of the gap between rows" "\n"
	"grid-row-start 	Specifies where to start the grid item" "\n"
	"grid-template 	A shorthand property for the grid-template-rows, grid-template-columns and grid-areas properties" "\n"
	"grid-template-areas 	Specifies how to display columns and rows, using named grid items" "\n"
	"grid-template-columns 	Specifies the size of the columns, and how many columns in a grid layout" "\n"
	"grid-template-rows 	Specifies the size of the rows in a grid layout" "\n"
	"H" "\n"
	"hanging-punctuation 	Specifies whether a punctuation character may be placed outside the line box" "\n"
	"height 	Sets the height of an element" "\n"
	"hyphens 	Sets how to split words to improve the layout of paragraphs" "\n"
	"I" "\n"
	"image-rendering 	Specifies the type of algorithm to use for image scaling" "\n"
	"@import 	Allows you to import a style sheet into another style sheet" "\n"
	"inline-size 	Specifies the size of an element in the inline direction" "\n"
	"inset 	Specifies the distance between an element and the parent element" "\n"
	"inset-block 	Specifies the distance between an element and the parent element in the block direction" "\n"
	"inset-block-end 	Specifies the distance between the end of an element and the parent element in the block direction" "\n"
	"inset-block-start 	Specifies the distance between the start of an element and the parent element in the block direction" "\n"
	"inset-inline 	Specifies the distance between an element and the parent element in the inline direction" "\n"
	"inset-inline-end 	Specifies the distance between the end of an element and the parent element in the inline direction" "\n"
	"inset-inline-start 	Specifies the distance between the start of an element and the parent element in the inline direction" "\n"
	"isolation 	Defines whether an element must create a new stacking content" "\n"
	"J" "\n"
	"justify-content 	Specifies the alignment between the items inside a flexible container when the items do not use all available space" "\n"
	"justify-items 	Is set on the grid container. Specifies the alignment of grid items in the inline direction" "\n"
	"justify-self 	Is set on the grid item. Specifies the alignment of the grid item in the inline direction" "\n"
	"K" "\n"
	"@keyframes 	Specifies the animation code" "\n"
	"L" "\n"
	"left 	Specifies the left position of a positioned element" "\n"
	"letter-spacing 	Increases or decreases the space between characters in a text" "\n"
	"line-break 	Specifies how/if to break lines" "\n"
	"line-height 	Sets the line height" "\n"
	"list-style 	Sets all the properties for a list in one declaration" "\n"
	"list-style-image 	Specifies an image as the list-item marker" "\n"
	"list-style-position 	Specifies the position of the list-item markers (bullet points)" "\n"
	"list-style-type 	Specifies the type of list-item marker" "\n"
	"M" "\n"
	"margin 	Sets all the margin properties in one declaration" "\n"
	"margin-block 	Specifies the margin in the block direction" "\n"
	"margin-block-end 	Specifies the margin at the end in the block direction" "\n"
	"margin-block-start 	Specifies the margin at the start in the block direction" "\n"
	"margin-bottom 	Sets the bottom margin of an element" "\n"
	"margin-inline 	Specifies the margin in the inline direction" "\n"
	"margin-inline-end 	Specifies the margin at the end in the inline direction" "\n"
	"margin-inline-start 	Specifies the margin at the start in the inline direction" "\n"
	"margin-left 	Sets the left margin of an element" "\n"
	"margin-right 	Sets the right margin of an element" "\n"
	"margin-top 	Sets the top margin of an element" "\n"
	"mask 	Hides parts of an element by masking or clipping an image at specific places" "\n"
	"mask-clip 	Specifies the mask area" "\n"
	"mask-composite 	Represents a compositing operation used on the current mask layer with the mask layers below it" "\n"
	"mask-image 	Specifies an image to be used as a mask layer for an element" "\n"
	"mask-mode 	Specifies whether the mask layer image is treated as a luminance mask or as an alpha mask" "\n"
	"mask-origin 	Specifies the origin position (the mask position area) of a mask layer image" "\n"
	"mask-position 	Sets the starting position of a mask layer image (relative to the mask position area)" "\n"
	"mask-repeat 	Specifies how the mask layer image is repeated" "\n"
	"mask-size 	Specifies the size of a mask layer image" "\n"
	"mask-type 	Specifies whether an SVG <mask> element is treated as a luminance mask or as an alpha mask" "\n"
	"max-height 	Sets the maximum height of an element" "\n"
	"max-width 	Sets the maximum width of an element" "\n"
	"@media 	Sets the style rules for different media types/devices/sizes" "\n"
	"max-block-size 	Sets the maximum size of an element in the block direction" "\n"
	"max-inline-size 	Sets the maximum size of an element in the inline direction" "\n"
	"min-block-size 	Sets the minimum size of an element in the block direction" "\n"
	"min-inline-size 	Sets the minimum size of an element in the inline direction" "\n"
	"min-height 	Sets the minimum height of an element" "\n"
	"min-width 	Sets the minimum width of an element" "\n"
	"mix-blend-mode 	Specifies how an element's content should blend with its direct parent background" "\n"
	"O" "\n"
	"object-fit 	Specifies how the contents of a replaced element should be fitted to the box established by its used height and width" "\n"
	"object-position 	Specifies the alignment of the replaced element inside its box" "\n"
	"offset 	Is a shorthand, and specifies how to animate an element along a path" "\n"
	"offset-anchor 	Specifies a point on an element that is fixed to the path it is animated along" "\n"
	"offset-distance 	Specifies the position along a path where an animated element is placed" "\n"
	"offset-path 	Specifies the path an element is animated along" "\n"
	"offset-rotate 	Specifies rotation of an element as it is animated along a path" "\n"
	"opacity 	Sets the opacity level for an element" "\n"
	"order 	Sets the order of the flexible item, relative to the rest" "\n"
	"orphans 	Sets the minimum number of lines that must be left at the bottom of a page or column" "\n"
	"outline 	A shorthand property for the outline-width, outline-style, and the outline-color properties" "\n"
	"outline-color 	Sets the color of an outline" "\n"
	"outline-offset 	Offsets an outline, and draws it beyond the border edge" "\n"
	"outline-style 	Sets the style of an outline" "\n"
	"outline-width 	Sets the width of an outline" "\n"
	"overflow Specifies what happens if content overflows an element's box" "\n"
	"overflow-anchor Specifies whether or not content in viewable area in a scrollable contianer should be pushed down when new content is loaded above" "\n"
	"overflow-wrap 	Specifies whether or not the browser can break lines with long words, if they overflow the container" "\n"
	"overflow-x 	Specifies whether or not to clip the left/right edges of the content, if it overflows the element's content area" "\n"
	"overflow-y 	Specifies whether or not to clip the top/bottom edges of the content, if it overflows the element's content area" "\n"
	"overscroll-behavior 	Specifies whether to have scroll chaining or overscroll affordance in x- and y-directions" "\n"
	"overscroll-behavior-block 	Specifies whether to have scroll chaining or overscroll affordance in the block direction" "\n"
	"overscroll-behavior-inline 	Specifies whether to have scroll chaining or overscroll affordance in the inline direction" "\n"
	"overscroll-behavior-x 	Specifies whether to have scroll chaining or overscroll affordance in x-direction" "\n"
	"overscroll-behavior-y 	Specifies whether to have scroll chaining or overscroll affordance in y-directions" "\n"
	"P" "\n"
	"padding 	A shorthand property for all the padding-* properties" "\n"
	"padding-block 	Specifies the padding in the block direction" "\n"
	"padding-block-end 	Specifies the padding at the end in the block direction" "\n"
	"padding-block-start 	Specifies the padding at the start in the block direction" "\n"
	"padding-bottom 	Sets the bottom padding of an element" "\n"
	"padding-inline 	Specifies the padding in the inline direction" "\n"
	"padding-inline-end 	Specifies the padding at the end in the inline direction" "\n"
	"padding-inline-start 	Specifies the padding at the start in the inline direction" "\n"
	"padding-left 	Sets the left padding of an element" "\n"
	"padding-right 	Sets the right padding of an element" "\n"
	"padding-top 	Sets the top padding of an element" "\n"
	"page-break-after 	Sets the page-break behavior after an element" "\n"
	"page-break-before 	Sets the page-break behavior before an element" "\n"
	"page-break-inside 	Sets the page-break behavior inside an element" "\n"
	"paint-order 	Sets the order of how an SVG element or text is painted." "\n"
	"perspective 	Gives a 3D-positioned element some perspective" "\n"
	"perspective-origin 	Defines at which position the user is looking at the 3D-positioned element" "\n"
	"place-content 	Specifies align-content and justify-content property values for flexbox and grid layouts" "\n"
	"place-items 	Specifies align-items and justify-items property values for grid layouts" "\n"
	"place-self 	Specifies align-self and justify-self property values for grid layouts" "\n"
	"pointer-events 	Defines whether or not an element reacts to pointer events" "\n"
	"position 	Specifies the type of positioning method used for an element (static, relative, absolute or fixed)" "\n"
	"Q" "\n"
	"quotes 	Sets the type of quotation marks for embedded quotations" "\n"
	"R" "\n"
	"resize 	Defines if (and how) an element is resizable by the user" "\n"
	"right 	Specifies the right position of a positioned element" "\n"
	"rotate 	Specifies the rotation of an element" "\n"
	"row-gap 	Specifies the gap between the grid rows" "\n"
	"S" "\n"
	"scale 	Specifies the size of an element by scaling up or down" "\n"
	"scroll-behavior 	Specifies whether to smoothly animate the scroll position in a scrollable box, instead of a straight jump" "\n"
	"scroll-margin 	Specifies the margin between the snap position and the container" "\n"
	"scroll-margin-block 	Specifies the margin between the snap position and the container in the block direction" "\n"
	"scroll-margin-block-end 	Specifies the end margin between the snap position and the container in the block direction" "\n"
	"scroll-margin-block-start 	Specifies the start margin between the snap position and the container in the block direction" "\n"
	"scroll-margin-bottom 	Specifies the margin between the snap position on the bottom side and the container" "\n"
	"scroll-margin-inline 	Specifies the margin between the snap position and the container in the inline direction" "\n"
	"scroll-margin-inline-end 	Specifies the end margin between the snap position and the container in the inline direction" "\n"
	"scroll-margin-inline-start 	Specifies the start margin between the snap position and the container in the inline direction" "\n"
	"scroll-margin-left 	Specifies the margin between the snap position on the left side and the container" "\n"
	"scroll-margin-right 	Specifies the margin between the snap position on the right side and the container" "\n"
	"scroll-margin-top 	Specifies the margin between the snap position on the top side and the container" "\n"
	"scroll-padding 	Specifies the distance from the container to the snap position on the child elements" "\n"
	"scroll-padding-block 	Specifies the distance in block direction from the container to the snap position on the child elements" "\n"
	"scroll-padding-block-end 	Specifies the distance in block direction from the end of the container to the snap position on the child elements" "\n"
	"scroll-padding-block-start 	Specifies the distance in block direction from the start of the container to the snap position on the child elements" "\n"
	"scroll-padding-bottom 	Specifies the distance from the bottom of the container to the snap position on the child elements" "\n"
	"scroll-padding-inline 	Specifies the distance in inline direction from the container to the snap position on the child elements" "\n"
	"scroll-padding-inline-end 	Specifies the distance in inline direction from the end of the container to the snap position on the child elements" "\n"
	"scroll-padding-inline-start 	Specifies the distance in inline direction from the start of the container to the snap position on the child elements" "\n"
	"scroll-padding-left 	Specifies the distance from the left side of the container to the snap position on the child elements" "\n"
	"scroll-padding-right 	Specifies the distance from the right side of the container to the snap position on the child elements" "\n"
	"scroll-padding-top 	Specifies the distance from the top of the container to the snap position on the child elements" "\n"
	"scroll-snap-align 	Specifies where to position elements when the user stops scrolling" "\n"
	"scroll-snap-stop 	Specifies scroll behaviour after fast swipe on trackpad or touch screen" "\n"
	"scroll-snap-type 	Specifies how snap behaviour should be when scrolling" "\n"
	"scrollbar-color 	Specifies the color of the scrollbar of an element" "\n"
	"T" "\n"
	"tab-size 	Specifies the width of a tab character" "\n"
	"table-layout 	Defines the algorithm used to lay out table cells, rows, and columns" "\n"
	"text-align 	Specifies the horizontal alignment of text" "\n"
	"text-align-last 	Describes how the last line of a block or a line right before a forced line break is aligned when text-align is \"justify\"" "\n"
	"text-combine-upright 	Specifies the combination of multiple characters into the space of a single character" "\n"
	"text-decoration 	Specifies the decoration added to text" "\n"
	"text-decoration-color 	Specifies the color of the text-decoration" "\n"
	"text-decoration-line 	Specifies the type of line in a text-decoration" "\n"
	"text-decoration-style 	Specifies the style of the line in a text decoration" "\n"
	"text-decoration-thickness 	Specifies the thickness of the decoration line" "\n"
	"text-emphasis 	Applies emphasis marks to text" "\n"
	"text-indent 	Specifies the indentation of the first line in a text-block" "\n"
	"text-justify 	Specifies the justification method used when text-align is \"justify\"" "\n"
	"text-orientation 	Defines the orientation of characters in a line" "\n"
	"text-overflow 	Specifies what should happen when text overflows the containing element" "\n"
	"text-shadow 	Adds shadow to text" "\n"
	"text-transform 	Controls the capitalization of text" "\n"
	"text-underline-position 	Specifies the position of the underline which is set using the text-decoration property" "\n"
	"top 	Specifies the top position of a positioned element" "\n"
	"transform 	Applies a 2D or 3D transformation to an element" "\n"
	"transform-origin 	Allows you to change the position on transformed elements" "\n"
	"transform-style 	Specifies how nested elements are rendered in 3D space" "\n"
	"transition 	A shorthand property for all the transition-* properties" "\n"
	"transition-delay 	Specifies when the transition effect will start" "\n"
	"transition-duration 	Specifies how many seconds or milliseconds a transition effect takes to complete" "\n"
	"transition-property 	Specifies the name of the CSS property the transition effect is for" "\n"
	"transition-timing-function 	Specifies the speed curve of the transition effect" "\n"
	"translate 	Specifies the position of an element" "\n"
	"U" "\n"
	"unicode-bidi 	Used together with the direction property to set or return whether the text should be overridden to support multiple languages in the same document" "\n"
	"user-select 	Specifies whether the text of an element can be selected" "\n"
	"V" "\n"
	"vertical-align 	Sets the vertical alignment of an element" "\n"
	"visibility 	Specifies whether or not an element is visible" "\n"
	"W" "\n"
	"white-space 	Specifies how white-space inside an element is handled" "\n"
	"widows 	Sets the minimum number of lines that must be left at the top of a page or column" "\n"
	"width 	Sets the width of an element" "\n"
	"word-break 	Specifies how words should break when reaching the end of a line" "\n"
	"word-spacing 	Increases or decreases the space between words in a text" "\n"
	"word-wrap 	Allows long, unbreakable words to be broken and wrap to the next line" "\n"
	"writing-mode 	Specifies whether lines of text are laid out horizontally or vertically" "\n"
	;
	
	// Reference: https://www.w3schools.com/tags/ref_attributes.asp
	String attributes_reference =
	"accept 	<input> 	Specifies the types of files that the server accepts (only for type=\"file\")" "\n"
	"accept-charset 	<form> 	Specifies the character encodings that are to be used for the form submission" "\n"
	// "accesskey 	Global Attributes 	Specifies a shortcut key to activate/focus an element" "\n"
	"action 	<form> 	Specifies where to send the form-data when a form is submitted" "\n"
	"align 	Not supported in HTML 5. 	Specifies the alignment according to surrounding elements. Use CSS instead" "\n"
	"alt 	<area>, <img>, <input> 	Specifies an alternate text when the original element fails to display" "\n"
	"async 	<script> 	Specifies that the script is executed asynchronously (only for external scripts)" "\n"
	"autocomplete 	<form>, <input> 	Specifies whether the <form> or the <input> element should have autocomplete enabled" "\n"
	"autofocus 	<button>, <input>, <select>, <textarea> 	Specifies that the element should automatically get focus when the page loads" "\n"
	"autoplay 	<audio>, <video> 	Specifies that the audio/video will start playing as soon as it is ready" "\n"
	"bgcolor 	Not supported in HTML 5. 	Specifies the background color of an element. Use CSS instead" "\n"
	"border 	Not supported in HTML 5. 	Specifies the width of the border of an element. Use CSS instead" "\n"
	"charset 	<meta>, <script> 	Specifies the character encoding" "\n"
	"checked 	<input> 	Specifies that an <input> element should be pre-selected when the page loads (for type=\"checkbox\" or type=\"radio\")" "\n"
	"cite 	<blockquote>, <del>, <ins>, <q> 	Specifies a URL which explains the quote/deleted/inserted text" "\n"
	"class 	Global Attributes 	Specifies one or more classnames for an element (refers to a class in a style sheet)" "\n"
	"color 	Not supported in HTML 5. 	Specifies the text color of an element. Use CSS instead" "\n"
	"cols 	<textarea> 	Specifies the visible width of a text area" "\n"
	"colspan 	<td>, <th> 	Specifies the number of columns a table cell should span" "\n"
	"content 	<meta> 	Gives the value associated with the http-equiv or name attribute" "\n"
	"contenteditable 	Global Attributes 	Specifies whether the content of an element is editable or not" "\n"
	"controls 	<audio>, <video> 	Specifies that audio/video controls should be displayed (such as a play/pause button etc)" "\n"
	"coords 	<area> 	Specifies the coordinates of the area" "\n"
	"data 	<object> 	Specifies the URL of the resource to be used by the object" "\n"
	"data-* 	Global Attributes 	Used to store custom data private to the page or application" "\n"
	"datetime 	<del>, <ins>, <time> 	Specifies the date and time" "\n"
	"default 	<track> 	Specifies that the track is to be enabled if the user's preferences do not indicate that another track would be more appropriate" "\n"
	"defer 	<script> 	Specifies that the script is executed when the page has finished parsing (only for external scripts)" "\n"
	"dir 	Global Attributes 	Specifies the text direction for the content in an element" "\n"
	"dirname 	<input>, <textarea> 	Specifies that the text direction will be submitted" "\n"
	"disabled 	<button>, <fieldset>, <input>, <optgroup>, <option>, <select>, <textarea> 	Specifies that the specified element/group of elements should be disabled" "\n"
	"download 	<a>, <area> 	Specifies that the target will be downloaded when a user clicks on the hyperlink" "\n"
	"draggable 	Global Attributes 	Specifies whether an element is draggable or not" "\n"
	"enctype 	<form> 	Specifies how the form-data should be encoded when submitting it to the server (only for method=\"post\")" "\n"
	"for 	<label>, <output> 	Specifies which form element(s) a label/calculation is bound to" "\n"
	"form 	<button>, <fieldset>, <input>, <label>, <meter>, <object>, <output>, <select>, <textarea> 	Specifies the name of the form the element belongs to" "\n"
	"formaction 	<button>, <input> 	Specifies where to send the form-data when a form is submitted. Only for type=\"submit\"" "\n"
	"headers 	<td>, <th> 	Specifies one or more headers cells a cell is related to" "\n"
	"height 	<canvas>, <embed>, <iframe>, <img>, <input>, <object>, <video> 	Specifies the height of the element" "\n"
	"hidden 	Global Attributes 	Specifies that an element is not yet, or is no longer, relevant" "\n"
	"high 	<meter> 	Specifies the range that is considered to be a high value" "\n"
	"href 	<a>, <area>, <base>, <link> 	Specifies the URL of the page the link goes to" "\n"
	"hreflang 	<a>, <area>, <link> 	Specifies the language of the linked document" "\n"
	"http-equiv 	<meta> 	Provides an HTTP header for the information/value of the content attribute" "\n"
	"id 	Global Attributes 	Specifies a unique id for an element" "\n"
	"ismap 	<img> 	Specifies an image as a server-side image map" "\n"
	"kind 	<track> 	Specifies the kind of text track" "\n"
	"label 	<track>, <option>, <optgroup> 	Specifies the title of the text track" "\n"
	"lang 	Global Attributes 	Specifies the language of the element's content" "\n"
	"list 	<input> 	Refers to a <datalist> element that contains pre-defined options for an <input> element" "\n"
	"loop 	<audio>, <video> 	Specifies that the audio/video will start over again, every time it is finished" "\n"
	"low 	<meter> 	Specifies the range that is considered to be a low value" "\n"
	"max 	<input>, <meter>, <progress> 	Specifies the maximum value" "\n"
	"maxlength 	<input>, <textarea> 	Specifies the maximum number of characters allowed in an element" "\n"
	"media 	<a>, <area>, <link>, <source>, <style> 	Specifies what media/device the linked document is optimized for" "\n"
	"method 	<form> 	Specifies the HTTP method to use when sending form-data" "\n"
	"min 	<input>, <meter> 	Specifies a minimum value" "\n"
	"multiple 	<input>, <select> 	Specifies that a user can enter more than one value" "\n"
	"muted 	<video>, <audio> 	Specifies that the audio output of the video should be muted" "\n"
	"name 	<button>, <fieldset>, <form>, <iframe>, <input>, <map>, <meta>, <object>, <output>, <param>, <select>, <textarea> 	Specifies the name of the element" "\n"
	"novalidate 	<form> 	Specifies that the form should not be validated when submitted" "\n"
	"onabort 	<audio>, <embed>, <img>, <object>, <video> 	Script to be run on abort" "\n"
	"onafterprint 	<body> 	Script to be run after the document is printed" "\n"
	"onbeforeprint 	<body> 	Script to be run before the document is printed" "\n"
	"onbeforeunload 	<body> 	Script to be run when the document is about to be unloaded" "\n"
	"onblur 	All visible elements. 	Script to be run when the element loses focus" "\n"
	"oncanplay 	<audio>, <embed>, <object>, <video> 	Script to be run when a file is ready to start playing (when it has buffered enough to begin)" "\n"
	"oncanplaythrough 	<audio>, <video> 	Script to be run when a file can be played all the way to the end without pausing for buffering" "\n"
	"onchange 	All visible elements. 	Script to be run when the value of the element is changed" "\n"
	"onclick 	All visible elements. 	Script to be run when the element is being clicked" "\n"
	"oncontextmenu 	All visible elements. 	Script to be run when a context menu is triggered" "\n"
	"oncopy 	All visible elements. 	Script to be run when the content of the element is being copied" "\n"
	"oncuechange 	<track> 	Script to be run when the cue changes in a <track> element" "\n"
	"oncut 	All visible elements. 	Script to be run when the content of the element is being cut" "\n"
	"ondblclick 	All visible elements. 	Script to be run when the element is being double-clicked" "\n"
	"ondrag 	All visible elements. 	Script to be run when the element is being dragged" "\n"
	"ondragend 	All visible elements. 	Script to be run at the end of a drag operation" "\n"
	"ondragenter 	All visible elements. 	Script to be run when an element has been dragged to a valid drop target" "\n"
	"ondragleave 	All visible elements. 	Script to be run when an element leaves a valid drop target" "\n"
	"ondragover 	All visible elements. 	Script to be run when an element is being dragged over a valid drop target" "\n"
	"ondragstart 	All visible elements. 	Script to be run at the start of a drag operation" "\n"
	"ondrop 	All visible elements. 	Script to be run when dragged element is being dropped" "\n"
	"ondurationchange 	<audio>, <video> 	Script to be run when the length of the media changes" "\n"
	"onemptied 	<audio>, <video> 	Script to be run when something bad happens and the file is suddenly unavailable (like unexpectedly disconnects)" "\n"
	"onended 	<audio>, <video> 	Script to be run when the media has reach the end (a useful event for messages like \"thanks for listening\")" "\n"
	"onerror 	<audio>, <body>, <embed>, <img>, <object>, <script>, <style>, <video> 	Script to be run when an error occurs" "\n"
	"onfocus 	All visible elements. 	Script to be run when the element gets focus" "\n"
	"onhashchange 	<body> 	Script to be run when there has been changes to the anchor part of the a URL" "\n"
	"oninput 	All visible elements. 	Script to be run when the element gets user input" "\n"
	"oninvalid 	All visible elements. 	Script to be run when the element is invalid" "\n"
	"onkeydown 	All visible elements. 	Script to be run when a user is pressing a key" "\n"
	"onkeypress 	All visible elements. 	Script to be run when a user presses a key" "\n"
	"onkeyup 	All visible elements. 	Script to be run when a user releases a key" "\n"
	"onload 	<body>, <iframe>, <img>, <input>, <link>, <script>, <style> 	Script to be run when the element is finished loading" "\n"
	"onloadeddata 	<audio>, <video> 	Script to be run when media data is loaded" "\n"
	"onloadedmetadata 	<audio>, <video> 	Script to be run when meta data (like dimensions and duration) are loaded" "\n"
	"onloadstart 	<audio>, <video> 	Script to be run just as the file begins to load before anything is actually loaded" "\n"
	"onmousedown 	All visible elements. 	Script to be run when a mouse button is pressed down on an element" "\n"
	"onmousemove 	All visible elements. 	Script to be run as long as the  mouse pointer is moving over an element" "\n"
	"onmouseout 	All visible elements. 	Script to be run when a mouse pointer moves out of an element" "\n"
	"onmouseover 	All visible elements. 	Script to be run when a mouse pointer moves over an element" "\n"
	"onmouseup 	All visible elements. 	Script to be run when a mouse button is released over an element" "\n"
	"onmousewheel 	All visible elements. 	Script to be run when a mouse wheel is being scrolled over an element" "\n"
	"onoffline 	<body> 	Script to be run when the browser starts to work offline" "\n"
	"ononline 	<body> 	Script to be run when the browser starts to work online" "\n"
	"onpagehide 	<body> 	Script to be run when a user navigates away from a page" "\n"
	"onpageshow 	<body> 	Script to be run when a user navigates to a page" "\n"
	"onpaste 	All visible elements. 	Script to be run when the user pastes some content in an element" "\n"
	"onpause 	<audio>, <video> 	Script to be run when the media is paused either by the user or programmatically" "\n"
	"onplay 	<audio>, <video> 	Script to be run when the media has started playing" "\n"
	"onplaying 	<audio>, <video> 	Script to be run when the media has started playing" "\n"
	"onpopstate 	<body> 	Script to be run when the window's history changes." "\n"
	"onprogress 	<audio>, <video> 	Script to be run when the browser is in the process of getting the media data" "\n"
	"onratechange 	<audio>, <video> 	Script to be run each time the playback rate changes (like when a user switches to a slow motion or fast forward mode)." "\n"
	"onreset 	<form> 	Script to be run when a reset button in a form is clicked." "\n"
	"onresize 	<body> 	Script to be run when the browser window is being resized." "\n"
	"onscroll 	All visible elements. 	Script to be run when an element's scrollbar is being scrolled" "\n"
	"onsearch 	<input> 	Script to be run when the user writes something in a search field (for <input type=\"search\">)" "\n"
	"onseeked 	<audio>, <video> 	Script to be run when the seeking attribute is set to false indicating that seeking has ended" "\n"
	"onseeking 	<audio>, <video> 	Script to be run when the seeking attribute is set to true indicating that seeking is active" "\n"
	"onselect 	All visible elements. 	Script to be run when the element gets selected" "\n"
	"onstalled 	<audio>, <video> 	Script to be run when the browser is unable to fetch the media data for whatever reason" "\n"
	"onstorage 	<body> 	Script to be run when a Web Storage area is updated" "\n"
	"onsubmit 	<form> 	Script to be run when a form is submitted" "\n"
	"onsuspend 	<audio>, <video> 	Script to be run when fetching the media data is stopped before it is completely loaded for whatever reason" "\n"
	"ontimeupdate 	<audio>, <video> 	Script to be run when the playing position has changed (like when the user fast forwards to a different point in the media)" "\n"
	"ontoggle 	<details> 	Script to be run when the user opens or closes the <details> element" "\n"
	"onunload 	<body> 	Script to be run when a page has unloaded (or the browser window has been closed)" "\n"
	"onvolumechange 	<audio>, <video> 	Script to be run each time the volume of a video/audio has been changed" "\n"
	"onwaiting 	<audio>, <video> 	Script to be run when the media has paused but is expected to resume (like when the media pauses to buffer more data)" "\n"
	"onwheel 	All visible elements. 	Script to be run when the mouse wheel rolls up or down over an element" "\n"
	"open 	<details> 	Specifies that the details should be visible (open) to the user" "\n"
	"optimum 	<meter> 	Specifies what value is the optimal value for the gauge" "\n"
	"pattern 	<input> 	Specifies a regular expression that an <input> element's value is checked against" "\n"
	"placeholder 	<input>, <textarea> 	Specifies a short hint that describes the expected value of the element" "\n"
	"poster 	<video> 	Specifies an image to be shown while the video is downloading, or until the user hits the play button" "\n"
	"preload 	<audio>, <video> 	Specifies if and how the author thinks the audio/video should be loaded when the page loads" "\n"
	"readonly 	<input>, <textarea> 	Specifies that the element is read-only" "\n"
	"rel 	<a>, <area>, <form>, <link> 	Specifies the relationship between the current document and the linked document" "\n"
	"required 	<input>, <select>, <textarea> 	Specifies that the element must be filled out before submitting the form" "\n"
	"reversed 	<ol> 	Specifies that the list order should be descending (9,8,7...)" "\n"
	"rows 	<textarea> 	Specifies the visible number of lines in a text area" "\n"
	"rowspan 	<td>, <th> 	Specifies the number of rows a table cell should span" "\n"
	"sandbox 	<iframe> 	Enables an extra set of restrictions for the content in an <iframe>" "\n"
	"scope 	<th> 	Specifies whether a header cell is a header for a column, row, or group of columns or rows" "\n"
	"selected 	<option> 	Specifies that an option should be pre-selected when the page loads" "\n"
	"shape 	<area> 	Specifies the shape of the area" "\n"
	"size 	<input>, <select> 	Specifies the width, in characters (for <input>) or specifies the number of visible options (for <select>)" "\n"
	"sizes 	<img>, <link>, <source> 	Specifies the size of the linked resource" "\n"
	"span 	<col>, <colgroup> 	Specifies the number of columns to span" "\n"
	"spellcheck 	Global Attributes 	Specifies whether the element is to have its spelling and grammar checked or not" "\n"
	"src 	<audio>, <embed>, <iframe>, <img>, <input>, <script>, <source>, <track>, <video> 	Specifies the URL of the media file" "\n"
	"srcdoc 	<iframe> 	Specifies the HTML content of the page to show in the <iframe>" "\n"
	"srclang 	<track> 	Specifies the language of the track text data (required if kind=\"subtitles\")" "\n"
	"srcset 	<img>, <source> 	Specifies the URL of the image to use in different situations" "\n"
	"start 	<ol> 	Specifies the start value of an ordered list" "\n"
	"step 	<input> 	Specifies the legal number intervals for an input field" "\n"
	"style 	Global Attributes 	Specifies an inline CSS style for an element" "\n"
	"tabindex 	Global Attributes 	Specifies the tabbing order of an element" "\n"
	"target 	<a>, <area>, <base>, <form> 	Specifies the target for where to open the linked document or where to submit the form" "\n"
	"title 	Global Attributes 	Specifies extra information about an element" "\n"
	"translate 	Global Attributes 	Specifies whether the content of an element should be translated or not" "\n"
	"type 	<a>, <button>, <embed>, <input>, <link>, <menu>, <object>, <script>, <source>, <style> 	Specifies the type of element" "\n"
	"usemap 	<img>, <object> 	Specifies an image as a client-side image map" "\n"
	"value 	<button>, <input>, <li>, <option>, <meter>, <progress>, <param> 	Specifies the value of the element" "\n"
	"width 	<canvas>, <embed>, <iframe>, <img>, <input>, <object>, <video> 	Specifies the width of the element" "\n"
	"wrap 	<textarea> 	Specifies how the text in a text area is to be wrapped when submitted in a form" "\n"
	;
	
	// Reference: https://www.w3schools.com/tags/ref_eventattributes.asp
	String events_reference =
	"onafterprint 	script 	Script to be run after the document is printed" "\n"
	"onbeforeprint 	script 	Script to be run before the document is printed" "\n"
	"onbeforeunload 	script 	Script to be run when the document is about to be unloaded" "\n"
	"onerror 	script 	Script to be run when an error occurs" "\n"
	"onhashchange 	script 	Script to be run when there has been changes to the anchor part of the a URL" "\n"
	"onload 	script 	Fires after the page is finished loading" "\n"
	"onmessage 	script 	Script to be run when the message is triggered" "\n"
	"onoffline 	script 	Script to be run when the browser starts to work offline" "\n"
	"ononline 	script 	Script to be run when the browser starts to work online" "\n"
	"onpagehide 	script 	Script to be run when a user navigates away from a page" "\n"
	"onpageshow 	script 	Script to be run when a user navigates to a page" "\n"
	"onpopstate 	script 	Script to be run when the window's history changes" "\n"
	"onresize 	script 	Fires when the browser window is resized" "\n"
	"onstorage 	script 	Script to be run when a Web Storage area is updated" "\n"
	"onunload 	script 	Fires once a page has unloaded (or the browser window has been closed)" "\n"
	"onblur 	script 	Fires the moment that the element loses focus" "\n"
	"onchange 	script 	Fires the moment when the value of the element is changed" "\n"
	"oncontextmenu 	script 	Script to be run when a context menu is triggered" "\n"
	"onfocus 	script 	Fires the moment when the element gets focus" "\n"
	"oninput 	script 	Script to be run when an element gets user input" "\n"
	"oninvalid 	script 	Script to be run when an element is invalid" "\n"
	"onreset 	script 	Fires when the Reset button in a form is clicked" "\n"
	"onsearch 	script 	Fires when the user writes something in a search field (for <input=\"search\">)" "\n"
	"onselect 	script 	Fires after some text has been selected in an element" "\n"
	"onsubmit 	script 	Fires when a form is submitted" "\n"
	"onkeydown 	script 	Fires when a user is pressing a key" "\n"
	"onkeypress 	script 	Fires when a user presses a key" "\n"
	"onkeyup 	script 	Fires when a user releases a key" "\n"
	"onclick 	script 	Fires on a mouse click on the element" "\n"
	"ondblclick 	script 	Fires on a mouse double-click on the element" "\n"
	"onmousedown 	script 	Fires when a mouse button is pressed down on an element" "\n"
	"onmousemove 	script 	Fires when the mouse pointer is moving while it is over an element" "\n"
	"onmouseout 	script 	Fires when the mouse pointer moves out of an element" "\n"
	"onmouseover 	script 	Fires when the mouse pointer moves over an element" "\n"
	"onmouseup 	script 	Fires when a mouse button is released over an element" "\n"
	"onmousewheel 	script 	Deprecated. Use the onwheel attribute instead" "\n"
	"onwheel 	script 	Fires when the mouse wheel rolls up or down over an element" "\n"
	"ondrag 	script 	Script to be run when an element is dragged" "\n"
	"ondragend 	script 	Script to be run at the end of a drag operation" "\n"
	"ondragenter 	script 	Script to be run when an element has been dragged to a valid drop target" "\n"
	"ondragleave 	script 	Script to be run when an element leaves a valid drop target" "\n"
	"ondragover 	script 	Script to be run when an element is being dragged over a valid drop target" "\n"
	"ondragstart 	script 	Script to be run at the start of a drag operation" "\n"
	"ondrop 	script 	Script to be run when dragged element is being dropped" "\n"
	"onscroll 	script 	Script to be run when an element's scrollbar is being scrolled" "\n"
	"oncopy 	script 	Fires when the user copies the content of an element" "\n"
	"oncut 	script 	Fires when the user cuts the content of an element" "\n"
	"onpaste 	script 	Fires when the user pastes some content in an element" "\n"
	"onabort 	script 	Script to be run on abort" "\n"
	"oncanplay 	script 	Script to be run when a file is ready to start playing (when it has buffered enough to begin)" "\n"
	"oncanplaythrough 	script 	Script to be run when a file can be played all the way to the end without pausing for buffering" "\n"
	"oncuechange 	script 	Script to be run when the cue changes in a <track> element" "\n"
	"ondurationchange 	script 	Script to be run when the length of the media changes" "\n"
	"onemptied 	script 	Script to be run when something bad happens and the file is suddenly unavailable (like unexpectedly disconnects)" "\n"
	"onended 	script 	Script to be run when the media has reach the end (a useful event for messages like \"thanks for listening\")" "\n"
	"onerror 	script 	Script to be run when an error occurs when the file is being loaded" "\n"
	"onloadeddata 	script 	Script to be run when media data is loaded" "\n"
	"onloadedmetadata 	script 	Script to be run when meta data (like dimensions and duration) are loaded" "\n"
	"onloadstart 	script 	Script to be run just as the file begins to load before anything is actually loaded" "\n"
	"onpause 	script 	Script to be run when the media is paused either by the user or programmatically" "\n"
	"onplay 	script 	Script to be run when the media is ready to start playing" "\n"
	"onplaying 	script 	Script to be run when the media actually has started playing" "\n"
	"onprogress 	script 	Script to be run when the browser is in the process of getting the media data" "\n"
	"onratechange 	script 	Script to be run each time the playback rate changes (like when a user switches to a slow motion or fast forward mode)" "\n"
	"onseeked 	script 	Script to be run when the seeking attribute is set to false indicating that seeking has ended" "\n"
	"onseeking 	script 	Script to be run when the seeking attribute is set to true indicating that seeking is active" "\n"
	"onstalled 	script 	Script to be run when the browser is unable to fetch the media data for whatever reason" "\n"
	"onsuspend 	script 	Script to be run when fetching the media data is stopped before it is completely loaded for whatever reason" "\n"
	"ontimeupdate 	script 	Script to be run when the playing position has changed (like when the user fast forwards to a different point in the media)" "\n"
	"onvolumechange 	script 	Script to be run each time the volume is changed which (includes setting the volume to \"mute\")" "\n"
	"onwaiting 	script 	Script to be run when the media has paused but is expected to resume (like when the media pauses to buffer more data)" "\n"
	"ontoggle 	script 	Fires when the user opens or closes the <details> element" "\n"
	;
	
	// Names to convert from joined to joiner by _.
	Dict<String, String> convert_names {
		{"accesskey", "access_key"},
		{"autocomplete", "auto_complete"},
		{"autofocus", "auto_focus"},
		{"autoplay", "auto_play"},
		{"contenteditable", "content_editable"},
		{"formaction", "form_action"},
		{"hreflang", "href_lang"},
		{"ismap", "is_map"},
		{"maxlength", "max_length"},
		{"novalidate", "no_validate"},
		{"onabort", "on_abort"},
		{"onafterprint", "on_after_print"},
		{"onbeforeprint", "on_before_print"},
		{"onbeforeunload", "on_before_unload"},
		{"onblur", "on_blur"},
		{"oncanplay", "on_canplay"},
		{"oncanplaythrough", "on_canplay_through"},
		{"onchange", "on_change"},
		{"onclick", "on_click"},
		{"oncontextmenu", "on_context_menu"},
		{"oncopy", "on_copy"},
		{"oncuechange", "on_cue_change"},
		{"oncut", "on_cut"},
		{"ondblclick", "on_dbl_click"},
		{"ondrag", "on_drag"},
		{"ondragend", "on_drag_end"},
		{"ondragenter", "on_drag_enter"},
		{"ondragleave", "on_drag_leave"},
		{"ondragover", "on_drag_over"},
		{"ondragstart", "on_drag_start"},
		{"ondrop", "on_drop"},
		{"ondurationchange", "on_duration_change"},
		{"onemptied", "on_emptied"},
		{"onended", "on_ended"},
		{"onerror", "on_error"},
		{"onfocus", "on_focus"},
		{"onhashchange", "on_hash_change"},
		{"oninput", "on_input"},
		{"oninvalid", "on_invalid"},
		{"onkeydown", "on_key_down"},
		{"onkeypress", "on_key_press"},
		{"onkeyup", "on_key_up"},
		{"onload", "on_load"},
		{"onloadeddata", "on_loaded_data"},
		{"onloadedmetadata", "on_loaded_metadata"},
		{"onloadstart", "on_load_start"},
		{"onmousedown", "on_mouse_down"},
		{"onmousemove", "on_mouse_move"},
		{"onmouseout", "on_mouse_out"},
		{"onmouseover", "on_mouse_over"},
		{"onmouseup", "on_mouse_up"},
		{"onmousewheel", "on_mouse_wheel"},
		{"onoffline", "on_offline"},
		{"ononline", "on_online"},
		{"onpagehide", "on_page_hide"},
		{"onpageshow", "on_page_show"},
		{"onpaste", "on_paste"},
		{"onpause", "on_pause"},
		{"onplay", "on_play"},
		{"onplaying", "on_playing"},
		{"onpopstate", "on_popstate"},
		{"onprogres", "on_progress"},
		{"onratechange", "on_rate_change"},
		{"onreset", "on_reset"},
		{"onresize", "on_resize"},
		{"onscroll", "on_scroll"},
		{"onsearch", "on_search"},
		{"onseeked", "on_seeked"},
		{"onseeking", "on_seeking"},
		{"onselect", "on_select"},
		{"onstalled", "on_stalled"},
		{"onstorage", "on_storage"},
		{"onsubmit", "on_submit"},
		{"onsuspend", "on_suspend"},
		{"ontimeupdate", "on_time_update"},
		{"ontoggle", "on_toggle"},
		{"onunload", "on_unload"},
		{"onvolumechange", "on_volume_change"},
		{"onwaiting", "on_waiting"},
		{"onwheel", "on_wheel"},
		{"rowspan", "row_span"},
		{"spellcheck", "spell_check"},
		{"srcdoc", "src_doc"},
		{"srclang", "src_lang"},
		{"srcset", "rrsrc_set"},
		{"tabindex", "tab_index"},
		{"usemap", "use_map"},
		{"zindex", "z_index"},
		// {"async", "_async"},
		// {"class", "class_name"},
		// {"for", "_for"},
	};
	
	// Some funcs are disabled.
	Array<String> disabled_funcs {
		"border",
		"height",
		"margin",
		"padding",
		"position",
		"vertical_align",
		"width",
		"style",
		"display",
		"wrap",
		"hidden",
		"media",
	};
	
	// Pad numeric funcs.
	// When a converted func name ends with one of these string the value will use this.pad_numeric.
	Array<String> pad_numeric_funcs {
		"width",
		"bottom",
		"left",
		"right",
		"top",
		"height",
	};
	Array<String> pad_numeric_funcs_eq_last {
		"_width",
		"_bottom",
		"_radius",
		"_left",
		"_right",
		"_top",
		"_height",
		"_size",
	};
	
	// Create js.
	String js;
	
	// CSS.
	js << "    // ---------------------------------------------------------\n";
	js << "    // Automatically generated CSS functions. \n";
	js << "    // Reference: https://www.w3schools.com/cssref/index.php. \n\n";
	css_reference.iterate_lines([&](const char* data, const ullong len) {
		String line(data, len);
		if (len > 1) {
			
			// Create name.
			ullong space = line.find(' ');
			if (space == NPos::npos) {
				print(data);
				return ;
			}
			String name (data, space);
			name.replace_r('-', '_');
			
			// JS name for style.
			String jsname;
			bool capital = false;
			for (auto& c: name) {
				if (c == '_') {
					capital = true;
				} else if (capital) {
					jsname.append(vlib::uppercase(c));
					capital = false;
				} else {
					jsname.append(c);
				}
			}
			
			// Skip.
			if (name.contains('*') || name.contains('@')) {
				return ;
			}
			
			// Comment.
			String comment (data + space, len - space);
			comment.replace_start_r(" \t");
			
			// Commented out.
			String commented_out = "";
			if (disabled_funcs.contains(name)) {
				commented_out = "// ";
			}
			
			// Padded value.
			String padded_value = "value";
			if (pad_numeric_funcs.contains(name)) {
				padded_value = "this.pad_numeric(value)";
			} else {
				for (auto& i: pad_numeric_funcs_eq_last) {
					if (name.eq_last(i)) {
						padded_value = "this.pad_numeric(value)";
						break;
					}
				}
			}
			
			// Create func.
			js << "    // " << comment << "\n" <<
			"    " << commented_out << name << "(value) {" << "\n" <<
			"    " << commented_out << "    this.element.style." << jsname << " = " << padded_value << ";" << "\n" <<
			"    " << commented_out << "    return this;" << "\n" <<
			"    " << commented_out << "}" << "\n" << "\n";
		}
	});
	
	Array<String> funcs;
	
	// All attributes.
	js << "    // ---------------------------------------------------------\n";
	js << "    // Automatically generated HTML attribute functions. \n";
	js << "    // Reference: https://www.w3schools.com/tags/ref_attributes.asp. \n\n";
	attributes_reference.replace_r("\t", "    ");
	attributes_reference.iterate_lines([&](const char* data, const ullong len) {
		String line(data, len);
		
		// Create name.
		ullong space = line.find("  ");
		if (space == NPos::npos) {
			print(data);
			return ;
		}
		String name (data, space);
		name.replace_r('-', '_');
		
		// Comment.
		space = line.find_first_not_of(" ", space);
		if (space == NPos::npos) {
			print(data);
			return ;
		}
		space = line.find("  ", space);
		if (space == NPos::npos) {
			print(data);
			return ;
		}
		String comment (data + space, len - space);
		comment.replace_start_r(" \t");
		
		// Skip.
		if (name.contains('*') || name.contains('@') || comment.contains("Use CSS instead")) {
			return ;
		}
		
		// Convert name.
		String converted_name = name;
		ullong index = convert_names.keys().find(name);
		if (index != NPos::npos) {
			converted_name = convert_names.value(index);
		}
		
		// Commented out.
		String commented_out = "";
		if (disabled_funcs.contains(name)) {
			commented_out = "// ";
		}
		
		// Padded value.
		String padded_value = "value";
		if (pad_numeric_funcs.contains(converted_name)) {
			padded_value = "this.pad_numeric(value)";
		} else {
			for (auto& i: pad_numeric_funcs_eq_last) {
				if (converted_name.eq_last(i)) {
					padded_value = "this.pad_numeric(value)";
					break;
				}
			}
		}
		
		// Create func.
		js << "    // " << comment << "\n" <<
		"    " << commented_out << converted_name << "(value) {" << "\n" <<
		"    " << commented_out << "	this.element." << name << " = " << padded_value << ";" << "\n" <<
		"    " << commented_out << "	return this;" << "\n" <<
		"    " << commented_out << "}" << "\n" << "\n";
		
		funcs.append(converted_name);

	});
	
	// Events.
	// Most of them are already in the attributes, but some not.
	events_reference.replace_r("\t", "    ");
	events_reference.iterate_lines([&](const char* data, const ullong len) {
		String line(data, len);
		
		// Create name.
		ullong space = line.find("  ");
		if (space == NPos::npos) {
			print(data);
			return ;
		}
		String name (data, space);
		name.replace_r('-', '_');
		
		// Comment.
		space = line.find_first_not_of(" ", space);
		if (space == NPos::npos) {
			print(data);
			return ;
		}
		space = line.find(' ', space);
		if (space == NPos::npos) {
			print(data);
			return ;
		}
		String comment (data + space, len - space);
		comment.replace_start_r(" \t");
		
		// Skip.
		if (name.contains('*') || name.contains('@') || comment.contains("Use CSS instead")) {
			return ;
		}
		
		// Convert name.
		String converted_name = name;
		ullong index = convert_names.keys().find(name);
		if (index != NPos::npos) {
			converted_name = convert_names.value(index);
		}
		
		// Commented out.
		String commented_out = "";
		if (disabled_funcs.contains(name)) {
			commented_out = "// ";
		}
		
		// Padded value.
		String padded_value = "value";
		if (pad_numeric_funcs.contains(converted_name)) {
			padded_value = "this.pad_numeric(value)";
		} else {
			for (auto& i: pad_numeric_funcs_eq_last) {
				if (converted_name.eq_last(i)) {
					padded_value = "this.pad_numeric(value)";
					break;
				}
			}
		}
		
		if (funcs.contains(converted_name)) {
			return ;
		}
		
		// Create func.
		js << "    // " << comment << "\n" <<
		"    " << commented_out << converted_name << "(value) {" << "\n" <<
		"    " << commented_out << "	this.element." << name << " = " << padded_value << ";" << "\n" <<
		"    " << commented_out << "	return this;" << "\n" <<
		"    " << commented_out << "}" << "\n" << "\n";

	});
	
	print(js);
}
