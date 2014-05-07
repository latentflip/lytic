module.exports.init = function (key) {

    // Include the UserVoice JavaScript SDK (only needed once on a page)
    window.UserVoice=window.UserVoice||[];
    (function(){
      var uv=document.createElement('script');
      uv.type='text/javascript';
      uv.async=true;
      uv.src='//widget.uservoice.com/' + key + '.js';
      var s=document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(uv,s);
    })();

    return window.UserVoice;
};
