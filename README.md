README
======

Tinkering with the ACE editor to support in-place mouseover.

1. Get a simple web-page with an embedded editor

2. Rig it so you can see where mouse is:

    * Some text box prints out the ID under the mouse

3. Get a tooltip working. See:

    https://github.com/ajaxorg/ace/blob/master/demo/kitchen-sink/token_tooltip.js#L34

   Just see the RAW hackery used for tooltips. DO NOT GET INTO THE REQUIRE.JS morass...

4.  Fill in the PROPER definition of js/annot.js/annotFun 

5. Modify Language.Haskell.Liquid.Annotate.annotate to produce: 

    foo.hs.json

6. Clone 
    
    liquid/haskell/demo

    A. Get *liquid.js* working with *ACE*
    
    B. Add "View Types" / "Edit Code" buttons
        - Make editor read-only when "view-types"

    C. Get *liquid.php* to read foo.hs.json and send over:
    
        http://stackoverflow.com/questions/8858848/php-read-and-write-json-from-file
    
    D. See the JSON file in JS console
    
    E. Hook into tooltip.js
        - Only when "view-types"



    
