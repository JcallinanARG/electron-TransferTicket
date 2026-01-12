
window.navigation = window.navigation || {},

function(n) {


    navigation.menu = {
      constants: {
        sectionTemplate: '.section-template',
        contentContainer: '#wrapper',
        startSectionMenuItem: '#welcome-menu',
        startSection: '#welcome'
      },

      importSectionsToDOM: function() {
        Array.from(document.getElementsByTagName('link')).forEach(item => {
          if(item.rel === 'import'){
            fetch(item.href).
            then(response => { if(!response.ok) throw Error(response.statusText); return response.text() }).
            then(text => {
              console.log("appending")
              $("#wrapper").append(text);
            }).
            catch(error => console.log(error) );
          }
        });},

      setMenuOnClickEvent: function () {
        document.body.addEventListener('click', function (event) {
          if (event.target.dataset.section) {
            navigation.menu.hideAllSections()
            navigation.menu.showSection(event)
          }
        })
      },

      showSection: function(event) {
        const sectionId = event.target.dataset.section
        $('#' + sectionId).show()
        $('#' + sectionId + ' section').show()
      },

      showStartSection: function() {
        $(navigation.menu.constants.startSectionMenuItem).click()
        $(navigation.menu.constants.startSection).show()
        $(navigation.menu.constants.startSection + ' section').show()
      },

      hideAllSections: function() {
        $(navigation.menu.constants.contentContainer + ' section').hide()
      },

      
      init: function() {
        this.importSectionsToDOM()
        //this.importJavascriptForSections()
        this.setMenuOnClickEvent()
        this.showStartSection()
      }
    };

    n(function() {
        navigation.menu.init()
     })
  
    }(jQuery);
