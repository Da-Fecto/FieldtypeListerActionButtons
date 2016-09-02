/**
 * Lister Action Buttons
 *
 * Capture & preventing further propagation when clicking Lister Action Buttons.
 *
 * @author: Martijn Geerts (Calago.nl)
 *
 */
var listerActionButtons = (function () {

	"use strict";

	var triggerModal = function () {

		$(".lister-action-button.pw-modal", this).on("click", function (e) {

			var $a = $(this),
				classList = $a.attr("class").split(/\s+/),
				modalSize = "medium";

			e.preventDefault();
			e.stopPropagation();

			$.each(ProcessWire.config.modals, function(size) {
				if (classList.indexOf("pw-modal-" + size) !== -1) {
					modalSize = size;
					return false;
				}
			});

			// Trigger ProcessWire modal and return $iframe
			var $iframe = pwModalWindow($a.attr("href"), {}, modalSize);

			// Refresh lister
			$iframe.on('dialogclose', function(event, ui) {
				var refresh = $('button', $a).data('refresh');
				if (refresh === 1) {
					$("#_ProcessListerRefreshTab").click();
				}
			});
		});
	};

	return {
		// Wait for document ready and listen for loaded events from $("#ProcessListerResults")
		init: $(function () {
			$("#ProcessListerResults").on("loaded", triggerModal);
		})
	};

}());
