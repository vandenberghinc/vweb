/*
 Author: Daan van den Bergh
 Copyright: © 2022 Daan van den Bergh.
*/

// Header.
#ifndef VWEB_UI_REQUEST_H
#define VWEB_UI_REQUEST_H


// Namespace vweb.
namespace vweb {

// Namespace ui.
namespace ui {

// ---------------------------------------------------------
// HTTP Request Body Value.

struct RequestBodyValue : public vlib::json::JsonValue<Dict<String, RequestBodyValue>> {
        
    // ---------------------------------------------------------
    // Definitions.
    
    using This = RequestBodyValue;
    using Base = vlib::json::JsonValue<Dict<String, RequestBodyValue>>;
    
    // ---------------------------------------------------------
    // Constructors.
    
    // Default constructor.
    RequestBodyValue() : Base() {}
    
    // Construct from template.
    template <typename Type> requires (!is_Element<Type>::value) constexpr
    RequestBodyValue(const Type& x) :
    Base(x)
    {}
    
    // Construct from GetElement.
    template <typename Type> requires (is_Element<Type>::value) constexpr
    RequestBodyValue(const Type& x) :
    Base(x.js())
    {}
    
    // ---------------------------------------------------------
    // Functions.
    
    // Construct from GetElement.
    template <typename Type> requires (is_Element<Type>::value) constexpr
    This&   construct(const Type& x) {
        this->construct(x.js());
        return *this;
    }
    
    // Reconstruct from GetElement.
    template <typename Type> requires (is_Element<Type>::value) constexpr
    This&   reconstruct(const Type& x) {
        this->reset();
        this->construct(x.js());
        return *this;
    }
    
    // Assignment operator from GetElement.
    template <typename Type> requires (is_Element<Type>::value) constexpr
    This&   operator =(const Type& x) {
        reconstruct(x);
        return *this;
    }
    
    // ---------------------------------------------------------
    // Casts.
    
    vlib::JsonValue jvalue() const {
        switch (this->m_type) {
            case vlib::json::types::null:
                return vlib::null;
            case vlib::json::types::boolean:
                return *this->m_bool;
            case vlib::json::types::floating:
                return *this->m_double;
            case vlib::json::types::integer:
                return *this->m_int;
            case vlib::json::types::len:
                return *this->m_len;
            case vlib::json::types::string:
                return *this->m_str;
            case vlib::json::types::array: {
                vlib::JArray data;
                for (auto& index: this->m_arr->indexes()) {
                    data.append(this->m_arr->get(index).jvalue());
                }
                return data;
            }
            case vlib::json::types::json:{
                vlib::Json data;
                for (auto& index: this->m_json->indexes()) {
                    data.append(m_json->key(index), m_json->value(index).jvalue());
                }
                return data;
            }
            default:
                return vlib::null;
        }
    }
    
};

// ---------------------------------------------------------
// HTTP Request Body.

using RequestBody = Dict<String, RequestBodyValue>;

// ---------------------------------------------------------
// HTTP Request.

// The request body's string values can not start or end with "$".
// When the request response is 200 the success event will be triggered, otherwise the error event.
struct Request {
    
// Private.
private:
    
    // ---------------------------------------------------------
    // Attributes.
    
    String      m_method;
    String      m_endpoint;
    RequestBody m_body;
    Event       m_success_event;
    Event       m_error_event;
    Event       m_pre_event;

// Public.
public:
    
    // ---------------------------------------------------------
    // Constructor.
    
    // Constructor.
    constexpr
    Request(
            const String& method,
            const String& endpoint,
            const RequestBody& body,
            const Event& success_event,
            const Event& error_event,
            const Event& pre_event = {}
    ) :
    m_method(method),
    m_endpoint(endpoint),
    m_body(body),
    m_success_event(success_event),
    m_error_event(error_event),
    m_pre_event(pre_event)
    {}
    
    // ---------------------------------------------------------
    // To json.
    
    // Convert request body to json.
    constexpr
    Json json(const RequestBody& body) const {
        Json data;
        for (auto& index: body.indexes()) {
            data.append(body.key(index), body.value(index).jvalue());
        }
        return data;
    }
    
    constexpr
    Json    json() const {
        return Json {
            {"type", "Request"},
            {"method", m_method},
            {"endpoint", m_endpoint},
            {"body", json(m_body)},
            {"success_event", m_success_event.json()["children"]},
            {"error_event", m_error_event.json()["children"]},
            {"pre_event", m_pre_event.json()["children"]},
        };
    }
    
};

// Is type.
template <typename Type>
struct is_Request { SICEBOOL value = false; };
template <>
struct is_Request<Request> { SICEBOOL value = true;  };

// ---------------------------------------------------------
// Shortcuts.

namespace shortcuts {
using RequestBody = vweb::ui::RequestBody;
using Request = vweb::ui::Request;
}

// ---------------------------------------------------------
// Response Conditions.
// All of these conditions can only be used within an Event.

#define VWEB_RESPONSE_CONDITION_TEMPLATE(name, strname, stroperator) \
struct name { \
    \
    Int     m_status; \
    Event   m_event; \
    \
    constexpr name() = default; \
    \
    constexpr \
    name(const Int& status, const Event& event) : \
    m_status(status), \
    m_event(event) \
    {} \
    \
    constexpr Json json() const { \
        return { \
            {"type", strname}, \
            {"operator", stroperator}, \
            {"value", m_status}, \
            {"event", m_event.json()["children"]}, \
        }; \
    } \
};  \
namespace shortcuts { \
using name = vweb::ui::name; \
}

struct IfResponseStatusEq; VWEB_RESPONSE_CONDITION_TEMPLATE(IfResponseStatusEq, "IfResponseStatusEq", "==");
struct IfResponseStatusNotEq; VWEB_RESPONSE_CONDITION_TEMPLATE(IfResponseStatusNotEq, "IfResponseStatusNotEq", "!=");
struct IfResponseStatusGreater; VWEB_RESPONSE_CONDITION_TEMPLATE(IfResponseStatusGreater, "IfResponseStatusGreater", ">");
struct IfResponseStatusGreaterEq; VWEB_RESPONSE_CONDITION_TEMPLATE(IfResponseStatusGreaterEq, "IfResponseStatusGreaterEq", ">=");
struct IfResponseStatusLesser; VWEB_RESPONSE_CONDITION_TEMPLATE(IfResponseStatusLesser, "IfResponseStatusLesser", "<");
struct IfResponseStatusLesserEq; VWEB_RESPONSE_CONDITION_TEMPLATE(IfResponseStatusLesserEq, "IfResponseStatusLesserEq", "<=");

// ---------------------------------------------------------
// End.

};         // End namespace ui.
};         // End namespace vweb.
#endif     // End header.

