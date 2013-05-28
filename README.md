README
======

Tinkering with the ACE editor to support in-place mouseover.

1. Get a simple web-page with an embedded editor

2. Rig it so you can see where mouse is:

    * Some text box prints out the ID under the mouse

3. Get a tooltip working. See:

    https://github.com/ajaxorg/ace/blob/master/demo/kitchen-sink/token_tooltip.js#L34

   Just see the RAW hackery used for tooltips. DO NOT GET INTO THE REQUIRE.JS morass...

4. HEREHEREHERE

    Fill in the PROPER definition of js/annot.js/annotFun 

    So that it uses the value of some global (sigh) JSON array to generate
    the contents. [Should be able to use the same format as what
    liquidhaskell generates? Perhaps some range searching to find the
    NEAREST identifier...]

