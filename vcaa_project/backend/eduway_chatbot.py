from flask import Blueprint, request, jsonify

chatbot_bp = Blueprint("chatbot_bp", __name__)



def generate_local_reply(user_message):

    msg = user_message.lower().strip()

   
    if any(x in msg for x in ["hello", "hi", "hey", "hii", "namaste", "good morning", "good evening"]):
        return "Hello! 👋 I am your **EduWay Admission Buddy**. How can I help you regarding your online admission process?"

  

    if "verify" in msg or "verification" in msg or ("come" in msg and "document" in msg):
        return (
            "📌 **EduWay follows a completely online admission & verification system.**\n"
            "You only have to **upload scanned documents online**, no in-person visit is required.\n"
            "🏫 You will physically visit the college **only when lectures officially begin.**"
        )

    if "original" in msg and "document" in msg:
        return (
            "📌 For admission processing, **only scanned copies** are required online.\n"
            "✔ Originals will be checked **later when asked by the college** after classes begin."
        )

    if ("self" in msg and "attest" in msg) or "notary" in msg:
        return (
            "📌 **Self-attested scanned copies** are usually accepted.\n"
            "Notarization is **not required** unless specifically instructed."
        )

    if "domicile" in msg:
        return (
            "📌 **Domicile Certificate is required** for Maharashtra State Quota.\n"
            "Without domicile, you will be counted as **OMS (Outside Maharashtra Student)**."
        )

    if "other state" in msg or "another state" in msg:
        return (
            "📌 Students from other states can take admission, but will be considered **OMS** and **cannot claim Maharashtra reservation or fee concessions.**"
        )

    if "caste validity" in msg and "pending" in msg:
        return (
            "📌 If caste validity is pending, upload **application receipt / acknowledgement**.\n"
            "Final validity must be submitted **later when instructed**."
        )

    if "ncl" in msg or "non creamy" in msg:
        if "expire" in msg or "expired" in msg:
            return (
                "📌 **NCL must be valid for the current academic year.**\n"
                "Apply for renewal and upload **receipt + undertaking** temporarily."
            )
        return (
            "📌 Yes, **Non-Creamy Layer (NCL)** is mandatory for OBC / VJNT / NT / SBC **to get fee concession**."
        )

    if "undertaking" in msg or "affidavit" in msg:
        return "📌 Undertaking / Affidavit may be accepted **temporarily**, but the final certificate is still required later."

    if "name mismatch" in msg:
        return (
            "📌 If name mismatch exists between SSC, Aadhaar & other documents, submit **Affidavit or Gazette Copy** or **update Aadhaar.**"
        )

    if "school leaving" in msg or "lc" in msg:
        return "📌 **School Leaving Certificate (LC)** is mandatory. Kindly collect it from your previous institute."

    if "gap" in msg:
        return "📌 Students with **1+ year academic gap** must upload a **Gap Affidavit**."

   
    if "sc" in msg and "document" in msg:
        return (
            "📄 **SC Required Documents:**\n"
            "• CET Scorecard & Allotment Letter\n• SSC & HSC Marksheets\n• Domicile/Nationality\n"
            "• Caste Certificate (SC)\n• Caste Validity Certificate\n"
        )

    if "st" in msg and "document" in msg:
        return (
            "📄 **ST Required Documents:**\n"
            "• CET Scorecard + Allotment Letter\n• SSC & HSC Marksheets\n• Domicile/Nationality\n"
            "• Caste Certificate (ST)\n• Caste Validity Certificate\n"
        )

    if any(k in msg for k in ["obc", "vjnt", "nt", "sbc"]) and "document" in msg:
        return (
            "📄 **OBC / VJNT / NT / SBC Required Documents:**\n"
            "• CET Scorecard + Allotment Letter\n• SSC & HSC Marksheets\n• Domicile\n"
            "• Caste Certificate\n• Caste Validity\n• Non-Creamy Layer Certificate\n"
        )

    if "ews" in msg and "document" in msg:
        return (
            "📄 **EWS Required Documents:**\n"
            "• CET Scorecard + Allotment Letter\n• SSC & HSC Marksheets\n• Domicile\n"
            "• Valid EWS Certificate (Income < ₹8,00,000)\n"
        )

    if "ews" in msg and "caste" in msg:
        return (
            "📌 You **cannot claim both Caste Reservation & EWS at the same time**.\n"
            "You must choose **either reservation or EWS benefit.**"
        )

    if "tfws" in msg:
        return (
            "📌 TFWS (Tuition Fee Waiver Scheme) requires:\n"
            "• Income Certificate (≤ ₹8,00,000)\n"
            "• Good Rank (based on cutoff)\n"
            "• Selection in Option Form\n"
            "No separate exam is required."
        )

   

    if "fee" in msg and "total" in msg:
        return (
            "💰 Total yearly cost generally includes:\n"
            "• Tuition Fee\n• Development & Exam Fee\n• Hostel & Mess (optional)\n"
            "📌 Exact structure depends on the college — refer institution website."
        )

    if "sc" in msg and "pay" in msg:
        return (
            "📌 **SC/ST** students generally receive **full tuition fee waiver**, but may need to pay:\n"
            "• Exam Fees\n• Hostel / Mess\n• Caution Money (refundable)\n"
        )

    if "obc" in msg and "concession" in msg:
        return "📌 OBC / VJNT / NT / SBC students get **50% concession** with valid **NCL**."

    if "scholarship" in msg:
        return (
            "🎓 Scholarships Available:\n"
            "• MahaDBT Post-Matric Scholarship\n"
            "• Minority Scholarship (if eligible)\n"
            "• TFWS based on merit\n"
            "👉 Apply via **MahaDBT Portal**"
        )

    if "refund" in msg or "cancellation" in msg:
        return (
            "📌 Refund depends on cancellation **date & rules**.\n"
            "Early cancellation = Higher refund. After cutoff = Partial or No refund."
        )

   
    if "hostel" in msg and "first" in msg:
        return "🏫 Hostel for first-year students depends on **availability, distance & policy**."

    if "hostel fee" in msg:
        return "💰 Hostel + Mess fee varies per college. Refer to official fee chart."

    if "girls hostel" in msg or "boys hostel" in msg:
        return "🏫 Yes, most colleges have **separate hostels** for girls and boys."

   

    if "file" in msg or "resolution" in msg:
        return "📌 Upload **PDF/JPG up to 1–2MB**, scanned @ 150–200 DPI, clear & readable."

    if "scan" in msg or "camscanner" in msg:
        return "📌 Mobile scanned docs allowed **if clear & without watermark**."

   
    if "change branch" in msg:
        return "📌 Branch change is possible **after first year** based on merit + availability."

   

    if "attendance" in msg:
        return "📌 Minimum **75% attendance** is mandatory."

    if "placement" in msg:
        return "📌 Placement details available on the **college placement page/website**."

    if "dress code" in msg or "uniform" in msg:
        return "📌 Some colleges have dress codes; check respective college policy."

   

    return (
        "I can help you with:\n"
        "• Online admission rules\n"
        "• Required documents (category-wise)\n"
        "• Fees & concession information\n"
        "• Hostel & scholarship details\n"
        "Ask anything in simple language 😊"
    )


@chatbot_bp.route("/eduway", methods=["POST"])
def eduway_chat():
    data = request.get_json() or {}
    user_message = data.get("message", "")

    if not user_message.strip():
        return jsonify({"reply": "Please type a question 😊"}), 400

    reply = generate_local_reply(user_message)

    return jsonify({"reply": reply}), 200
