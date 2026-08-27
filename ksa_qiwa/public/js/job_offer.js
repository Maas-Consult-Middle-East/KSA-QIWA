frappe.ui.form.on("Job Offer", {
    refresh(frm) {

        if (!frm.doc.job_applicant) {
            return;
        }

        frappe.db.get_value(
            "Employee",
            {
                job_applicant: frm.doc.job_applicant
            },
            "name"
        ).then(r => {

            if (!r.message?.name) {
                return;
            }

            frm.add_custom_button(
                __("Download Qiwa"),
                () => {

                    const print_format = "QIWA Contract";

                    const url =
                        `/printview?doctype=${encodeURIComponent(frm.doc.doctype)}` +
                        `&name=${encodeURIComponent(frm.doc.name)}` +
                        `&format=${encodeURIComponent(print_format)}` +
                        `&no_letterhead=0` +
                        `&letterhead=` +
                        `&settings=%7B%7D` +
                        `&_lang=en`;

                    const print_window = window.open(
                        url,
                        "_blank"
                    );

                    if (print_window) {

                        print_window.onload = function () {

                            setTimeout(() => {
                                print_window.focus();
                                print_window.print();
                            }, 1000);

                        };

                    } else {

                        frappe.msgprint(
                            __("Please allow popups to print the QIWA Contract.")
                        );

                    }

                }
            );

        });

    }
});