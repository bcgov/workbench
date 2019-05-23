var cacheBuster =  Math.random() * 10000 | 0;

const MessageBusAjax = function(options){
  var XHRImpl = window.XMLHttpRequest;
  var xhr = new XHRImpl();
  xhr.dataType = options.dataType;
  var url = options.url;
  if (!options.cache){
    url += ((-1 == url.indexOf('?')) ? '?' : '&') + '_=' + (cacheBuster++)
  }
  xhr.open('POST', url);
  for (var name in options.headers){
    xhr.setRequestHeader(name, options.headers[name]);
  }
  xhr.setRequestHeader('Content-Type', 'application/json');
  if (options.messageBus.chunked){
    options.messageBus.onProgressListener(xhr);
  }
  xhr.onreadystatechange = function(){
    if (xhr.readyState === 4){
      var status = xhr.status;
      if (status >= 200 && status < 300 || status === 304){
        options.success(xhr.responseText);
      } else {
        options.error(xhr, xhr.statusText);
      }
      options.complete();
    }
  }
  xhr.send(JSON.stringify(options.data));
  return xhr;
};

export default MessageBusAjax;
