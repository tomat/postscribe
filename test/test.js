$(document).ready(function(){

  // style elements
  // comments
  // noscript
  // escaped attributes (see writeCapture)
  // tbody!

  module('style');
  setOptions({});
  testWrite('simple style', function(ctx) {
    ctx.write('<style> h3 {color: blue;}</style>');
  });




  module('attributes');
  setOptions({});

  testWrite('string double quote', function(ctx) {
    ctx.write('<img alt="foo">');
    ctx.eq($('img', ctx.doc).attr('alt'));
  });

  testWrite('string single quote', function(ctx) {
    ctx.write('<img alt=\'foo\'>');
    ctx.eq($('img', ctx.doc).attr('alt'));
  });

  testWrite('string unquoted', function(ctx) {
    ctx.write('<img alt=foo>');
    ctx.eq($('img', ctx.doc).attr('alt'));
  });

  testWrite('empty string', function(ctx) {
    ctx.write('<img alt="">');
    ctx.eq($('img', ctx.doc).attr('alt'));
  });

  testWrite('no value', function(ctx) {
    ctx.write('<input type="checkbox" checked>');
    ctx.eq($('input', ctx.doc).attr('checked'));
  });

  // document.write (script) tests
  module('document.write');

  testWrite('remainder', function(ctx) {
    ctx.writeRemote('remote/write-remote-and-inline-script.js');
    ctx.write('A<script src="remote/write-remote-and-inline-script.js">');
    ctx.write('</script>B');
    ctx.writeRemote('remote/write-remote-and-inline-script.js');
  });

  testWrite('docwrite outside parent of script', function(ctx) {
    ctx.write('<div>A<script type="text/javascript">document.write("B</div>C");</script>D');
  });

  testWrite('capital script', function(ctx) {
    ctx.write('A<SCRIPT type="text/javascript">document.write("B");</SCRIPT>C');
  });

  testWrite('capital script@SRC', function(ctx) {
    ctx.write('<SCRIPT TYPE="text/javascript" SRC="remote/write-div.js"></SCRIPT>');
  });

  testWrite('inline', function(ctx) {
    ctx.write('A<script type="text/javascript">document.write("B");</script>C');
  });

  testWrite('nested document.write', function(ctx) {
    // document.write calls document.write!
    var inner = "B<script type='text/javascript'>document.write('C');<\\/script>D";
    ctx.write('A<script type="text/javascript">document.write("'+inner+'");</script>E');
  });

  testWrite('globals', function(ctx) {
    ctx.write('<script>var XQWER = "foo";</script><script>document.write(""+window.XQWER + (this === window) + (window === top));</script>');
  });

  // Native doesn't seem to support this!
  false && testWrite('partial script', function(ctx) {
    ctx.write('<script>var QWVES=1');
    ctx.write('7;</script>');
    ctx.write('<script>document.write(QWVES);</script>');
  });

  testWrite('remote then write', function(ctx) {
    ctx.writeRemote('remote/write-div.js');
    ctx.write('<div id="local">Local</div>');
  });

  testWrite('double remote', function(ctx) {
    ctx.writeRemote('remote/write-div.js');
    ctx.write('<div id="local">Local</div>');
    ctx.writeRemote('remote/write-div.js');
    ctx.write('<div id="local">Local</div>');
  });

  testWrite('remote then remote then write', function(ctx) {
    ctx.writeRemote('remote/write-remote-script.js');
    ctx.write('<div id="local">Local</div>');
  });

  testWrite('remote => (remote and inline), write', function(ctx) {
    ctx.writeRemote('remote/write-remote-and-inline-script.js');
    ctx.write('<div id="local">Local</div>');
  });

  testWrite('remote then inline then write', function(ctx) {
    ctx.writeRemote('remote/write-inline-script.js');
    ctx.write('<div id="local">Local</div>');
  });

  // IE natively does this wrong. It uses the inline global instead of the remote one.
  testWrite('remote + global', function(ctx) {
    ctx.writeInline('var global1 = "inline global1"');
    ctx.writeRemote('remote/set-global1.js');
    ctx.writeInline('document.write(this.global1);');
  });

  module('multiple');
  testWrite('MULT1',

    function(ctx) {
      ctx.writeRemote('remote/write-remote-script.js');
      ctx.write('<div id="local">Local</div>');
    },
    function(ctx) {
      ctx.writeRemote('remote/write-remote-and-inline-script.js');
      ctx.write('<div id="local">Local</div>');
    },
    function(ctx) {
      ctx.writeRemote('remote/write-inline-script.js');
      ctx.write('<div id="local">Local</div>');
    },
    function(ctx) {
      ctx.writeRemote('remote/write-remote-script.js');
      ctx.write('<div id="local">Local</div>');
    },
    function(ctx) {
      ctx.writeRemote('remote/write-remote-and-inline-script.js');
      ctx.write('<div id="local">Local</div>');
    },
    function(ctx) {
      ctx.writeRemote('remote/write-inline-script.js');
      ctx.write('<div id="local">Local</div>');
    },
    function(ctx) {
      ctx.writeRemote('remote/write-remote-script.js');
      ctx.write('<div id="local">Local</div>');
    },
    function(ctx) {
      ctx.writeRemote('remote/write-remote-and-inline-script.js');
      ctx.write('<div id="local">Local</div>');
    } ,
    function(ctx) {
      ctx.writeRemote('remote/write-inline-script.js');
      ctx.write('<div id="local">Local</div>');
    },
    function(ctx) {
      ctx.writeRemote('remote/write-remote-script.js');
      ctx.write('<div id="local">Local</div>');
    },
    function(ctx) {
      ctx.writeRemote('remote/write-remote-and-inline-script.js');
      ctx.write('<div id="local">Local</div>');
    },
    function(ctx) {
      ctx.writeRemote('remote/write-inline-script.js');
      ctx.write('<div id="local">Local</div>');
    }
  );

  // Test simple writing

  module('Self Closing');
  setOptions({});




  module('Simple writes');
  setOptions({});

  testWrite('empty tag', function(ctx) {
    ctx.write('<span>A<input name="B">C</span>D');
  });

  testWrite('SW1', function(ctx) {
    ctx.write('<div>');
    ctx.write('<i>foo');
  });

  testWrite('SW2', function(ctx) {
    ctx.write('<div><i');
    ctx.write('>foo');
  });


  testWrite('SW2-b', function(ctx) {
    ctx.write('<div>foo');
    ctx.write('<div>bar');
  });


  testWrite('SW3', function(ctx) {
    ctx.write('<div><i>foo');
    ctx.write('</i><div>bar');
  });

  testWrite('SW4', function(ctx) {
    ctx.write('<div><i></i></div>');
    ctx.write('<div>foo');
  });

  testWrite('SW5', function(ctx) {
    ctx.write('<div><i></i></div>foo');
  });

  testWrite('SW6', function(ctx) {
    ctx.write('<div><i></i></div>');
    ctx.write('<div>foo<i');
    ctx.write('></i></div>bar');
  });

  testWrite('SW7', function(ctx) {
    ctx.write('<div><div><i></i></div>');
    ctx.write('foo');
    ctx.write('<div>bar</div>');
  });

  testWrite('SW8', function(ctx) {
    ctx.write('<div><i></i></div>');
    ctx.write('foo');
    ctx.write('<div>');
    ctx.write('<i></i>');
  });

  testWrite('SW9', function(ctx) {
    ctx.write('<div><i></i></div>');
    ctx.write('foo');
    ctx.write('<div>bar');
    ctx.write('<i></i>');
  });

  testWrite('SW10', function(ctx) {
    ctx.write('<div><b><i></i></b></div>');
    ctx.write('foo');
    ctx.write('<div>bar<i>');
    ctx.write('</i>bla');
  });


  // Test that writing happens immediately
  module('immediacy');
  setOptions({
    useExpected: !supports.docwriteSync
  });

  testWrite('getElementById', function(ctx){
    ctx.write('<div id="foo"><div>bar');

    var span;
    span = ctx.doc.createElement('span');
    span.innerHTML = 'baz';
    ctx.doc.getElementById('foo').appendChild(span);

    ctx.write('<i>bla</i></div>');
  });


  module('Tag Soup');
  setOptions({});

  testWrite("TS1", function(ctx) {
    ctx.write('<div><i></div>');
    ctx.write('foo');
  });


  testWrite("TS2", function(ctx) {
    ctx.write('<div><i>');
    ctx.write('<div>foo');
    ctx.write('<div><i>');
  });


  testWrite('foo should be italicized', function(ctx) {
    ctx.write('<div><i>');
    ctx.write('<div>foo');
  });

  testWrite('inside-out i/p', function(ctx) {
    ctx.write('<div><i></div>');
    ctx.write('<div>foo');
  });



  testWrite("TS5", function(ctx) {
    ctx.write('<div><i></div>');
  });



  testWrite("TS6", function(ctx) {
    ctx.write('<div><i></div>');
    ctx.write('<div>foo<i>');
    ctx.write('</div>bar');
  });


  testWrite('character placeholders', function(ctx) {
    ctx.write('<div><div><i></div>');
    ctx.write('foo');
    ctx.write('<div>bar</div>');
  });

  testWrite('just a close tag', function(ctx) {
    ctx.write('</i>');
  });

  testWrite("TS9", function(ctx) {
    ctx.write('<div><i></div>');
    ctx.write('foo');
    ctx.write('<div>');
    ctx.write('</i>');
  });

  testWrite("TS10", function(ctx) {
    ctx.write('<div><i></div>');
    ctx.write('foo');
    ctx.write('<div>bar');
    ctx.write('</i>');
  });

  testWrite("TS11", function(ctx) {
    ctx.write('<div><b><i></div>');
    ctx.write('foo');
    ctx.write('<div>bar<i>');
    ctx.write('</b>bla');
  });

  testWrite('random stuff', function(ctx) {
    //ctx.write('<div>h</i>ey<i');
    ctx.write('<div>hey<i');
    ctx.write('>there<div>Continue </i>outside');
    ctx.write('<div>Not<b> italics<i></div>');
    ctx.write('in italics');
    ctx.write('<div>Should also be in italics<i>');
    ctx.write('</div>in it</b>alics2<b');
    ctx.write('><div>hi</div>');
    ctx.write('<div>h</i>ey<i');
    ctx.write('>there</div>Continue </i>outside<b>please</b>');
  });

});
