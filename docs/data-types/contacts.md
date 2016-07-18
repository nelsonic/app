
  ```
  {
    "globalm" : {
      "mappings" : {
        "contacts" : {
          "properties" : {
            "connectedTo" : {
              "type" : "string"
            },
            "connections" : {
              "type" : "long"
            },
            "contacts" : {
              "properties" : {
                "address" : {
                  "type" : "string"
                },
                "email" : {
                  "type" : "string"
                },
                "emailRaw" : {
                  "type" : "string",
                  "index" : "not_analyzed"
                },
                "im" : {
                  "type" : "string"
                },
                "phone" : {
                  "type" : "string"
                },
                "website" : {
                  "type" : "string"
                }
              }
            },
            "current" : {
              "type" : "string"
            },
            "cvDocumentLink" : {
              "type" : "string"
            },
            "date" : {
              "type" : "long"
            },
            "doc" : {
              "properties" : {
                "info" : {
                  "properties" : {
                    "idCandidate" : {
                      "type" : "string"
                    },
                    "locations" : {
                      "type" : "string"
                    },
                    "notice" : {
                      "type" : "string"
                    },
                    "scurrent" : {
                      "type" : "string"
                    },
                    "sexpected" : {
                      "type" : "string"
                    }
                  }
                }
              }
            },
            "emails" : {
              "properties" : {
                "message" : {
                  "type" : "string"
                },
                "senderEmail" : {
                  "type" : "string"
                },
                "senderId" : {
                  "type" : "string"
                },
                "senderName" : {
                  "type" : "string"
                },
                "sentAt" : {
                  "type" : "string"
                },
                "subject" : {
                  "type" : "string"
                },
                "timestamp" : {
                  "type" : "long"
                }
              }
            },
            "experience" : {
              "properties" : {
                "current" : {
                  "properties" : {
                    "date" : {
                      "type" : "string"
                    },
                    "desc" : {
                      "type" : "string"
                    },
                    "location" : {
                      "type" : "string"
                    },
                    "org" : {
                      "type" : "string"
                    },
                    "title" : {
                      "type" : "string"
                    }
                  }
                },
                "past" : {
                  "properties" : {
                    "date" : {
                      "type" : "string"
                    },
                    "desc" : {
                      "type" : "string"
                    },
                    "location" : {
                      "type" : "string"
                    },
                    "org" : {
                      "type" : "string"
                    },
                    "title" : {
                      "type" : "string"
                    }
                  }
                }
              }
            },
            "favourite" : {
              "type" : "string"
            },
            "fullname" : {
              "type" : "string",
              "fields" : {
                "raw" : {
                  "type" : "string",
                  "index" : "not_analyzed"
                }
              }
            },
            "headline" : {
              "type" : "string"
            },
            "info" : {
              "properties" : {
                "idCandidate" : {
                  "type" : "string"
                },
                "locations" : {
                  "type" : "string"
                },
                "notice" : {
                  "type" : "string"
                },
                "scurrent" : {
                  "type" : "string"
                },
                "sexpected" : {
                  "type" : "string"
                }
              }
            },
            "infoNote" : {
              "properties" : {
                "id" : {
                  "type" : "string"
                },
                "notes" : {
                  "type" : "string"
                },
                "timestamp" : {
                  "type" : "long"
                }
              }
            },
            "jobApplications" : {
              "properties" : {
                "comments" : {
                  "type" : "string"
                },
                "jobID" : {
                  "type" : "string"
                },
                "skillset" : {
                  "type" : "string"
                },
                "timestamp" : {
                  "type" : "long"
                }
              }
            },
            "languages" : {
              "properties" : {
                "fluency" : {
                  "type" : "string"
                },
                "lang" : {
                  "type" : "string"
                }
              }
            },
            "listNames" : {
              "type" : "string",
              "index" : "not_analyzed"
            },
            "location" : {
              "type" : "string"
            },
            "notes" : {
              "properties" : {
                "author" : {
                  "type" : "string"
                },
                "company" : {
                  "type" : "string"
                },
                "createdAt" : {
                  "type" : "string"
                },
                "id" : {
                  "type" : "string"
                },
                "notes" : {
                  "type" : "string"
                },
                "status" : {
                  "type" : "string"
                }
              }
            },
            "notesList" : {
              "properties" : {
                "idCandidate" : {
                  "type" : "string"
                },
                "idUser" : {
                  "type" : "string"
                },
                "note" : {
                  "type" : "string"
                },
                "timestamp" : {
                  "type" : "long"
                }
              }
            },
            "picture" : {
              "type" : "string"
            },
            "rejected" : {
              "properties" : {
                "idCandidate" : {
                  "type" : "string"
                },
                "idClientUser" : {
                  "type" : "string"
                },
                "idJob" : {
                  "type" : "string"
                },
                "timestamp" : {
                  "type" : "long"
                }
              }
            },
            "skills" : {
              "properties" : {
                "level" : {
                  "type" : "long"
                },
                "skill" : {
                  "type" : "string"
                }
              }
            },
            "statusCurrent" : {
              "properties" : {
                "idCandidate" : {
                  "type" : "string",
                  "index" : "not_analyzed"
                },
                "idClient" : {
                  "type" : "string",
                  "index" : "not_analyzed"
                },
                "idClientUser" : {
                  "type" : "string"
                },
                "idJob" : {
                  "type" : "string",
                  "index" : "not_analyzed"
                },
                "idStage" : {
                  "type" : "string",
                  "index" : "not_analyzed"
                },
                "idUser" : {
                  "type" : "string",
                  "index" : "not_analyzed"
                },
                "timestamp" : {
                  "type" : "long"
                }
              }
            },
            "statusHistory" : {
              "properties" : {
                "idCandidate" : {
                  "type" : "string"
                },
                "idClient" : {
                  "type" : "string"
                },
                "idJob" : {
                  "type" : "string"
                },
                "idStage" : {
                  "type" : "string"
                },
                "idUser" : {
                  "type" : "string"
                },
                "timestamp" : {
                  "type" : "long"
                }
              }
            },
            "summary" : {
              "type" : "string"
            },
            "url" : {
              "type" : "string"
            },
            "viewedBy" : {
              "properties" : {
                "fullname" : {
                  "type" : "string"
                },
                "id" : {
                  "type" : "string"
                },
                "initials" : {
                  "type" : "string"
                },
                "timestamp" : {
                  "type" : "long"
                }
              }
            }
          }
        }
      }
    }
  }

  ```
