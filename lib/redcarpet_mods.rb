require 'middleman-core/renderers/redcarpet'

module RedcarpetMods
  # Fix header
  def header(text, level)
    clean_id = text.downcase.gsub(/( +|\.+)/, '-').gsub(/[^a-zA-Z0-9\-_]/, '')
    "<h#{level} id='#{clean_id}'>#{text}</h#{level}>"
  end

  # Parse markdown in aside tags
  def block_html(raw_html)
    if (md = raw_html.match(/\<(.+?)\>(.*)\<(\/.+?)\>/m))
      open_tag, content, close_tag = md.captures
      if (open_tag["aside"] and close_tag["aside"])
        @markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML)
        "<#{open_tag}>#{@markdown.render content}<#{close_tag}>"
      else
        raw_html
      end
    end
  end

  def block_code(code, lang)
    # TODO: figure out more idiomatic way to do this
    nohide = false

    # Selector
    selector = "<div class=\"code-snippet__selector\">
      <nav>
          <button class=\"selector_switch\" id=\"raw\">raw</button>
          <button class=\"selector_switch\" id=\"php\">php</button>
          <button class=\"selector_switch\" id=\"ruby\">ruby</button>
          <button class=\"selector_switch\" id=\"python\">python</button>
          <button class=\"selector_switch\" id=\"javascript\">javascript</button>
      </nav>
    </div>"

    if lang.is_a?(String)
      if lang.include?('noselect')
        lang['noselect'] = ''
        selector = ''
        nohide = true
      end
    end

    code = "<pre>#{super}</pre>"

    lang = lang + 'nohide' if nohide

    # Button
    button = "<button class=\"btn alternative\">copy</button>"         

    output = "<div class=\"code-snippet js-code-snippet language-#{lang}\">" + button + selector + "<div class=\"code-snippet__cnt highlight\">"
    output << add_code_tags(code, lang)
    output << "</div></div>"
  end
end

Middleman::Renderers::MiddlemanRedcarpetHTML.send :include, RedcarpetMods