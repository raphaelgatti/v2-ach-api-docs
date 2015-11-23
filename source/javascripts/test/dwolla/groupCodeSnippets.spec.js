describe('Group code snippets', function () {
    'use strict';

    beforeEach(function () {
        var html = '<div class="cnt-two-col__content">';
        html += '<div class="js-code-snippet language-ruby">';
        html += '<div class="code-snippet__cnt">This will add height.</div></div>';
        html += '<div class="js-code-snippet language-python">';
        html += '<div class="code-snippet__cnt"></div></div>';
        html += '<div class="js-code-snippet language-javascript">';
        html += '<div class="code-snippet__cnt"></div></div>';
        html += '<div class="js-code-snippet language-java">';
        html += '<div class="code-snippet__cnt"></div></div>';
        html += '<div class="js-code-snippet language-php">';
        html += '<div class="code-snippet__cnt"></div></div>';
        html += '<div class="js-code-snippet language-raw">';
        html += '<div class="code-snippet__cnt"></div></div>';
        html += '<p></p>';
        html += '<div class="js-code-snippet language-ruby"></div>';
        html += '<div class="js-code-snippet language-python"></div>';
        html += '<div class="js-code-snippet language-php"></div>';
        html += '<div class="js-code-snippet language-java"></div>';
        html += '<div class="js-code-snippet language-javascript"></div>';
        html += '<div class="js-code-snippet language-raw"></div>';
        html += '<div class="js-code-snippet language-ruby"></div>';
        html += '<div class="js-code-snippet language-python"></div>';
        html += '<div class="js-code-snippet language-javascript"></div>';
        html += '<div class="js-code-snippet language-java"></div>';
        html += '<div class="js-code-snippet language-php"></div>';
        html += '<div class="js-code-snippet language-raw"></div></div>';
        $('html').html(html);
    });

    afterEach(function () {
        $('html').html('');
    });

    it('should exist as a fixture', function () {
        var jsCodeSnippet = $('.js-code-snippet')[0];
        assert.notEqual(jsCodeSnippet, undefined);
    });

    it('should be able to get a language', function () {
        var lang = dwolla.slateWL.groupCodeSnippets.getLanguage('js-code-snippet language-javascript');
        assert.equal(lang, 'javascript');
    });

    it('should be able to determine a groupable language', function () {
        assert.equal(dwolla.slateWL.groupCodeSnippets.hasGroupableLang('php'), true);
        assert.equal(dwolla.slateWL.groupCodeSnippets.hasGroupableLang('pythons'), false);
    });

    it('should be able to level a group', function () {
        var snippets = $('.js-code-snippet'),
            wrapCollection = [snippets[0], snippets[1], snippets[2], snippets[3]];

        dwolla.slateWL.groupCodeSnippets.levelTheGroup(wrapCollection);
        assert.equal($('.code-snippet__cnt', snippets[1]).height(), $('.code-snippet__cnt', snippets[2]).height());
        assert.equal($('.code-snippet__cnt', snippets[3]).height(), $('.code-snippet__cnt', snippets[0]).height());
    });

    it('should be able to group all code snippets', function () {
        dwolla.slateWL.groupCodeSnippets.groupAndLevelAllCodeSnippets();

        assert.equal($('.code-snippet-group').length, 3);
        assert.equal($('.js-code-snippet', $('.code-snippet-group ')[0]).length, 6);
    });

});