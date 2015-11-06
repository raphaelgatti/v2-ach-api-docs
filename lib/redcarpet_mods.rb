require 'middleman-core/renderers/redcarpet'
require 'nokogiri'

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
      if (open_tag["ol"] and close_tag["ol"])
        html = Nokogiri::HTML(content)
        @markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML)
        "<#{open_tag}><li class=\"alert icon-alert-alert\">#{@markdown.render html.content.strip}</li><#{close_tag}>"
      else
        raw_html
      end
    end
  end
end

Middleman::Renderers::MiddlemanRedcarpetHTML.send :include, RedcarpetMods